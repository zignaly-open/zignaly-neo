import { AuctionBidType } from '@zignaly-open/raffles-shared/types';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../../../db';
import { ContextUser } from '../../../types';
import { User } from '../../users/model';
import { AuctionBid, Auction } from '../model';

async function getSortedAuctionBids(
  id: number,
  showAllBids?: boolean,
  user?: ContextUser,
) {
  return (
    await sequelize.query(
      `
          SELECT filtered.* FROM (
              SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY T."value" DESC) as "position" FROM ( 
                SELECT MAX(b.value) as value, MAX(b.id) as id, b."auctionId", b."userId", MAX(b."claimTransactionId") as "claimTransactionId", u."username" as "username"
                FROM "${AuctionBid.tableName}" b
                INNER JOIN "${User.tableName}" u ON b."userId" = u."id"
                WHERE "auctionId" ${id ? '=' : '>'} $auctionId
                GROUP BY "auctionId", "userId", "username"
             ) t
          ) filtered
          INNER JOIN "${Auction.tableName}" a ON a."id" = filtered."auctionId"
          WHERE 
              "position" <= a."numberOfWinners" 
              OR "userId" = $currentUserId 
              ${showAllBids ? 'OR 1' : ''}
    `,
      {
        type: QueryTypes.SELECT,
        bind: { auctionId: id || 0, currentUserId: user?.id || 0 },
      },
    )
  ).map(
    (b: {
      id: number;
      claimTransactionId: number;
      position: number;
      username: string;
      userId: number;
      value: string;
      auctionId: number;
    }) =>
      ({
        position: b.position,
        id: b.id,
        auctionId: b.auctionId,
        isClaimed: !!b.claimTransactionId,
        value: b.value,
        user: {
          id: b.userId,
          username: b.username,
        },
      } as AuctionBidType),
  );
}
export default getSortedAuctionBids;
