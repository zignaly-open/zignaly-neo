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
  if tonumber(balance) >= 1 then
    -- Get auction
    local auction = redis.call('HGETALL', keyAuction)
    local expire = tonumber(auction[2])
    local maxExpire = tonumber(auction[4])
    local bidStep = tonumber(auction[6])

    -- Get time in microseconds
    local time = redis.call('TIME')
    local microtime = tonumber(time[1] .. time[2])

    if microtime < expire then
      -- Decrease user balance
      redis.call('HINCRBY', keyBalance, userId, -1)
      -- Increase auction price
      redis.call('HINCRBYFLOAT', keyAuction, 'price', bidStep)
      -- Add user to rank
      redis.call('ZADD', keyRank, microtime, userId)

      if expire < maxExpire and expire - microtime <= 10 * 10e6 then
        -- Extend expiration date
        local randomSecs = math.random(5, 12)
        redis.call('HSET', keyAuction, 'expire', expire + randomSecs)
      end
      return true
    end
  end

  return false
end

redis.register_function('update_balance', update_balance)
redis.register_function('bid', bid)