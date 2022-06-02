import {Auction} from "./Auction";

export const resolvers = {
    Query: {
        auctions: async () => Auction.allAuctions(),
        auction: async (_: any, { id }: {id: number}) => Auction.oneAuction(id)
    },
    Mutation: {
        bid: async (_: any, { id, bid }: {id: number, bid: number}) => {
            Auction.bid(id, bid);
            return Auction.oneAuction(id);
        }
    }
};
