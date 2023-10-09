import Image from 'next/image';

export const Profile = () => {
    const data = {
        image: '',
        name: '山田花子',
        id: '@yamahana',
        discription: '高校生でエンジニアの山田花子です。やまはなってよんでね！',
        followNum: 98,
        followerNum: 202,
    };
    return (
        <div>
            <button className="text-gray-5F ml-auto relative block top-12 mr-[8vw] text-xs font-normal hover:bg-slate-800 text-center bg-gray-D9 py-1 px-2 rounded-[10px]">
                プロフィールを編集
            </button>
            <Image
                src={data.image}
                alt=""
                width={120}
                height={120}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                className="mx-auto"
            />
            <h3 className=" font-normal text-center text-xl text-black pt-3">{data.name}</h3>
            <p className=" text-gray-5F text-center font-normal text-lg">{data.id}</p>
            <p className="text-gray-5F text-center font-normal text-lg pt-5">{data.discription}</p>
            <div className="flex justify-center text-black text-center font-normal pt-6 text-lg gap-x-5">
                <p>フォロー中 {data.followerNum}人</p>

                <p>フォロワー {data.followerNum}人</p>
            </div>
        </div>
    );
};
