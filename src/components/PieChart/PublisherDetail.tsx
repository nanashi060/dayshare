import Image from 'next/image';
import { FC } from 'react';

type Prop = { data: any };

export const Publisher: FC<Prop> = ({ data }) => {
    const name = data.name;
    const id = data.id;
    const time = data.date;
    const icon_image = data.icon_image;
    return (
        <div className="flex gap-x-3">
            <Image
                src={icon_image}
                alt=""
                width={42}
                height={42}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
            />

            <div>
                <div className="flex gap-x-3">
                    <p className="text-xs font-normal ">{name}</p>
                    <p className="text-xs font-normal text-[#5F5F5F]">{id}</p>
                </div>
                <p className="text-xs font-normal text-[#5F5F5F]">{time}</p>
            </div>
        </div>
    );
};
