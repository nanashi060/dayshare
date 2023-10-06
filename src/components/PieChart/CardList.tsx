import { Card } from './Card';

export const CardList = () => {
    const data = ['大学生', 'エンジニア'];
    return (
        <div className="grid grid-cols-3 place-items-center">
            {data.map((item, index) => (
                <Card key={index} />
            ))}
        </div>
    );
};
