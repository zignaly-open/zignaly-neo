#!lua name=zigbids

local function update_balance(keys, args)
  local cybavoBalanceKey = keys[1]
  local currentBalanceKey = keys[2]
  local id = args[1]
  local newCybavoBalance = tonumber(args[2])
  local cybavoBalance = tonumber(redis.call('HGET', cybavoBalanceKey, id))
  local currentBalance = tonumber(redis.call('HGET', currentBalanceKey, id))

  -- Don't do anything if cached cybavo balance is up to date
  if newCybavoBalance == cybavoBalance then
    return currentBalance or cybavoBalance
  end

  -- Update cached cybavo balance
  redis.call('HSET', cybavoBalanceKey, id, newCybavoBalance)

  local newCurrentBalance = newCybavoBalance
  if currentBalance then
    -- Increase the current balance by the difference fo cybavo balances
    newCurrentBalance = currentBalance + (newCybavoBalance - cybavoBalance)
  end
  -- Set cached current balance
  redis.call('HSET', currentBalanceKey, id, newCurrentBalance)
  
  return newCurrentBalance
end

local function get_auction_data(keys, args)
  local auction = redis.call('HGETALL', keys[1])
  local start = tonumber(auction[2])
  local expire = tonumber(auction[4])
  -- local maxExpire = tonumber(auction[6])
  -- local bidStep = tonumber(auction[8])
  -- local bidFee = tonumber(auction[10])
  local price = tonumber(auction[12])
  local ranking = redis.call('ZRANGE', keys[2], 0, -1);
  return {expire, price, ranking}
end

local function bid(keys, args)
  local keyBalance = keys[1]
  local keyAuction = keys[2]
  local keyRank = keys[3]

  local userId = args[1]
  local auctionId = args[2]

  -- Get auction
  local auction = redis.call('HGETALL', keyAuction)
  local start = tonumber(auction[2])
  local expire = tonumber(auction[4])
  local maxExpire = tonumber(auction[6])
  local bidStep = tonumber(auction[8])
  local bidFee = tonumber(auction[10])

  if not expire or not maxExpire or not bidStep then
    return -3
  end

  -- Check balance
  local balance = redis.call('HGET', keyBalance, userId)
  if not balance then
    return -1
  elseif tonumber(balance) < bidFee then
    return -2
  end

  -- Get time in microseconds
  local time = redis.call('TIME')
  local microtime = tonumber(time[1]) * 1000000 + tonumber(time[2])

  if microtime < start then
    return -5
  end

  if microtime < expire then
    -- Decrease user balance
    redis.call('HINCRBY', keyBalance, userId, -bidFee)
    -- Increase auction price
    redis.call('HINCRBY', keyAuction, 'price', bidStep)
    -- Add user to rank
    redis.call('ZADD', keyRank, 'GT', microtime, userId)

    if expire < maxExpire and expire - microtime <= 10 * 1000000 then
      -- Extend expiration date
      local randomSecs = math.random(5, 12)
      redis.call('HSET', keyAuction, 'expire', expire + randomSecs * 1000000)
    end

    -- Return new balance
    return balance - bidFee
  end
  return -4
end

redis.register_function('update_balance', update_balance)
redis.register_function('get_auction_data', get_auction_data)
redis.register_function('bid', bid)