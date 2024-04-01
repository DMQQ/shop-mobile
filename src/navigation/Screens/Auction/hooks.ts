import { useQuery, gql, useMutation } from "@apollo/client";
import { Auction } from "/@types/types";
import { useUser } from "utils/context/UserContext";

const ADD_BID = gql`
  mutation AddBid($auction_id: ID!, $amount: Int!) {
    createBid(bid: { auction_id: $auction_id, amount: $amount }) {
      amount
      bid_id
    }
  }
`;

const GET_AUCTION = gql`
  query Auction($auction_id: ID!) {
    auction(auction_id: $auction_id) {
      auction_id
      product {
        prod_id
        title
        rating
        category
        quantity
        description
        images(take: 3) {
          id
          name
        }
      }
      bids(take: 7) {
        date_add
        bid_id
        amount
        user
      }
    }
  }
`;

export function useAddBid() {
  const { user } = useUser();

  return useMutation(ADD_BID, {
    context: {
      headers: {
        token: user.token,
      },
    },
    errorPolicy: "ignore",
    refetchQueries: ["Auction"],
  });
}

interface Response {
  auction?: Auction;
}

export function useGetAuction(auction_id: string) {
  const { user } = useUser();
  return useQuery<Response>(GET_AUCTION, {
    variables: {
      auction_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });
}
