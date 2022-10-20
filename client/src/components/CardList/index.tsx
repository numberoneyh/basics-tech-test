import {FC} from "react";
import {IUser} from "../../models";
import {Card} from "../Card";

interface CardListProps {
  data: IUser[] | undefined
}

export const CardList: FC<CardListProps> = ({data}) => {
  return (
    <div className={'grid grid-cols-3 grid-rows-2 gap-4'}>
      {data?.map(users => (
        <Card key={users._id} {...users} />
      ))}
    </div>
  )
}
