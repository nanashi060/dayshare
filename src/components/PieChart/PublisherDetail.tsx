import Image from 'next/image';
import { FC } from 'react';

type Prop = { data: any };

export const Publisher: FC<Prop> = ({ data }) => {
    const name = data.name;
    const id = data.id;
    const time = data.date;
    return (
        <div className="flex">
            <Image src={''} alt="" width={42} height={42} style={{ objectFit: 'cover' }} />

            <div>
                <div className="flex">
                    <p className="text-xs font-normal ">{name}</p>
                    <p className="text-xs font-normal text-[#5F5F5F]">{id}</p>
                </div>
                <p className="text-xs font-normal text-[#5F5F5F]">{time}</p>
            </div>
        </div>
    );
};
