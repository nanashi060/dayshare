import { FaChartPie } from 'react-icons/fa6';
import { FaHouse } from 'react-icons/fa6';
import { FaSistrix } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { FaCalendarPlus } from 'react-icons/fa6';

export default function Sidebar() {
    return (
        <div className="p-6 w-1/4 bg-white text-left -ml-0 mr-auto h-screen min-w-max border-r border-gray-D9">
            <div className="w-12">
                <a href="/">
                    <FaChartPie size={48} />
                </a>
            </div>

            <div className="mt-10 ml-6 mb-16">
                <div className="text-gray-5F text-lg mb-7 hover:opacity-70 hover:duration-200">
                    <a href="/" className="flex items-center gap-5">
                        <FaHouse size={36} />
                        ホーム
                    </a>
                </div>
                <div className="text-gray-5F text-lg mb-7 hover:opacity-70 hover:duration-200">
                    <a href="/search" className="flex items-center gap-5">
                        <FaSistrix size={36} /> 検索
                    </a>
                </div>
                <div className="text-gray-5F text-lg hover:opacity-70 hover:duration-200">
                    <a href="/profile" className="flex items-center gap-5">
                        <FaUser size={36} /> プロフィール
                    </a>
                </div>
            </div>

            <a href='/postmodal' className="bg-kusumi-pink text-white pt-3 pb-3 justify-center rounded-xl w-52 flex text-md gap-5 items-center mb-6 mx-auto hover:scale-105 hover:duration-300" >
                <FaCalendarPlus size={32} />
                スケジュールを追加
            </a>
            <a href='/signin' className="bg-kusumi-pink text-white pt-4 pb-4 justify-center rounded-xl w-52 flex text-md mb-6 mx-auto hover:scale-105 hover:duration-300">
                ログイン
            </a>
            <a href='/signup' className="bg-kusumi-pink text-white pt-4 pb-4 justify-center rounded-xl w-52 flex text-md mb-6 mx-auto hover:scale-105 hover:duration-300">
                新規登録
            </a>
        </div>
    );
}
