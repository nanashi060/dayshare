import Image from 'next/image';

export const Publisher = () => {
  const name = '山田花子';
  const id = '@yamahana';
  const time = '2023/10/02 15:37';
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
