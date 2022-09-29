#!lua name=zigbids

local function update_balance(keys, args)
  local cybavoBalanceKey = keys[1]
  local currentBalanceKey = keys[2]
  local cybavoBalance = args[1]
  local balance = redis.call('GET', cybavoBalanceKey)
  -- Don't do anything if cached cybavo balance is up to date
  if balance == cybavoBalance then
    return cybavoBalance
  end

  -- Update cached cybavo balance
  redis.call('SET', cybavoBalanceKey, cybavoBalance)
  -- Update cached current balance, if it doesn't exist
  local res = redis.call('SETNX', currentBalanceKey, cybavoBalance)
  if res == 0 then
    -- Otherwise increase the current balance by the difference
    local diff = cybavoBalance - balance
    return redis.call('INCRBY', currentBalanceKey, diff)
  end
  return cybavoBalance
end

redis.register_function('update_balance', update_balance)