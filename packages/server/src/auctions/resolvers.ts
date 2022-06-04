import {Auction} from "./Auction";

export const resolvers = {
    Query: {
        auctions: async (_: any, { id }: {id: number}) =>
            id ? [Auction.oneAuction(id)] : Auction.allAuctions(),

},
    Mutation: {
        bid: async (_: any, { id, bid }: {id: number, bid: number}) => {
            Auction.bid(id, bid);
            return Auction.oneAuction(id);
        }
    }
};
