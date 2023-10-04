import { Card } from './Card';

export const CardList = () => {
  return (
    <div className="grid grid-cols-3 place-items-center">
      {data.map((item) => {
        <Card data={item} />;
      })}
    </div>
  );
};
