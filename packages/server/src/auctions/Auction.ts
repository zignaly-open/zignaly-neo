export enum AuctionStatus {
    Draft = 'Draft',
    Active = 'Active',
    Complete = 'Complete',
}

export type AuctionType = {
    id: number,
    title: string,
    createdAt?: Date,
    expiresAt?: Date,
    status: AuctionStatus,
    bids: {
        value: number, // TODO: BigInt?
        date: Date
    }[]
}

const auctions = [
    {
        id: 1,
        title: 'Auction 1',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3600_000),
        status: AuctionStatus.Active,
        bids: [{
            value: 100,
            date: new Date()
        }]
    }
] as AuctionType[];

export class Auction {
    static allAuctions() {
        return auctions;
    }

    static oneAuction(auctionId: AuctionType["id"]) {
        return auctions.find(x => x.id === auctionId);
    }

    static bid(auctionId: AuctionType["id"], value: number) {
        const auction = auctions.find(x => x.id === auctionId);
        auction.bids.unshift({
            value,
            date: new Date()
        })
    }
}
