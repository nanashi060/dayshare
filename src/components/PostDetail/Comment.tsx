import Image from 'next/image';
import React, { FC } from 'react';

type Prop = { item: any };

const comment: FC<Prop> = ({ item }) => {
    const name = item.name;
    const time = item.time;
    const comment = item.comment;
    return (
        <>
            <div className="flex gap-x-2">
                <Image
                    src={''}
                    alt=""
                    width={42}
                    height={42}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
                <div>
                    <div className="flex gap-x-[85px]">
                        <p className="text-black text-xs font-normal">{name}</p>
                        <p className="text-gray-5F text-xs font-normal ">{time}</p>
                    </div>
                    <p className="pl-[6px] pt-2 text-black text-sm font-normal">{comment}</p>
                </div>
            </div>
        </>
    );
};

export default comment;
