# Zignaly Zigraffle Server

Scenarios to test:

### Auctions
* Should get a list of auctions
* Should receive events when bids are made
* Should receive correct bid info from the backend to calculate isLosing, etc
* Bid less than max bid => fail
* Bid inactive auction => fail
* Bid expired auction => fail
* Bid without enough money for bid => fail
* Bid without enough money for bid + bid fee => fail
* Bid successfully => success
* Bid successfully but without any money left and then bid again or on another auction => fail
* Bid successfully for 2+fee, then bid for 3+fee, result => 3 frozen, 2*fee withdrawn
* Bid 1+fee, 1 frozen, 1*fee withdrawn, get outbid => frozen is unfrozen
* Auction ends => necessary payouts are made and frozen money is withdrawn

### Transfers
* Should be able to deposit funds

### Users
* Should be able to log in
* Should be able to subscribe only to their balance changes
