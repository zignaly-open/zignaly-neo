#!lua name=zigbids

local function update_balance(keys, args)
  local cybavoBalanceKey = keys[1]
  local currentBalanceKey = keys[2]
  local id = args[1]
  local cybavoBalance = args[2]
  local balance = redis.call('HGET', id, cybavoBalanceKey)
  -- Don't do anything if cached cybavo balance is up to date
  if balance == cybavoBalance then
    return cybavoBalance
  end

  -- Update cached cybavo balance
  redis.call('HSET', cybavoBalanceKey, id, cybavoBalance)
  -- Update cached current balance, if it doesn't exist
  local res = redis.call('HSETNX', currentBalanceKey, id, cybavoBalance)
  if res == 0 then
    -- Otherwise increase the current balance by the difference
    local diff = cybavoBalance - balance
    return redis.call('HINCRBY', currentBalanceKey, id, diff)
  end
  return cybavoBalance
end

local function bid(keys, args)
  local keyBalance = keys[1]
  local keyAuction = keys[2]
  local keyRank = keys[3]

  local userId = args[1]
  local auctionId = args[2]

  -- Check balance
  local balance = redis.call('HGET', keyBalance, userId)
  if not balance then
    return -1
  elseif tonumber(balance) < 1 then
    return -2
  end

  -- Get auction
  local auction = redis.call('HGETALL', keyAuction)
  local start = tonumber(auction[2])
  local expire = tonumber(auction[4])
  local maxExpire = tonumber(auction[6])
  local bidStep = tonumber(auction[8])

  if not expire or not maxExpire or not bidStep then
    return -3
  end

  -- Get time in microseconds
  local time = redis.call('TIME')
  local microtime = tonumber(time[1] .. time[2])

  if microtime < start then
    return -5
  end

  if microtime < expire then
    -- Decrease user balance
    redis.call('HINCRBY', keyBalance, userId, -1 * 100)
    -- Increase auction price
    redis.call('HINCRBYFLOAT', keyAuction, 'price', bidStep * 100)
    -- Add user to rank
    redis.call('ZADD', keyRank, microtime, userId)

    if expire < maxExpire and expire - microtime <= 10 * 1000000 then
      -- Extend expiration date
      local randomSecs = math.random(5, 12)
      redis.call('HSET', keyAuction, 'expire', expire + randomSecs * 1000000)
    end
    return 1
  end
  return -4
end

local function get_auction_data(keys, args)
  local auction = redis.call('HGETALL', keys[1])
  local start = tonumber(auction[2])
  local expire = tonumber(auction[4])
  -- local maxExpire = tonumber(auction[6])
  -- local bidStep = tonumber(auction[8])
  local price = tonumber(auction[10])
  local ranking = redis.call('ZRANGE', keys[2], 0, -1);
  return {expire, price, ranking}
end

redis.register_function('update_balance', update_balance)
redis.register_function('bid', bid)
redis.register_function('get_auction_data', get_auction_data)