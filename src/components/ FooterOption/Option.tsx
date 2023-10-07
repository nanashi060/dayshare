import React from 'react';

const FooterOption = () => {
    return (
        <div className="flex">
            <button className="bg-[#D9D9D9] hover:bg-[#BE8080]  text-black font-bold py-3 px-5 my-2 mx-10 rounded">
                おすすめ
            </button>
            <button className="bg-[#D9D9D9] hover:bg-[#BE8080] text-black font-bold py-3 px-5 my-2 mx-10 rounded">
                大学生
            </button>
            <button className="bg-[#D9D9D9] hover:bg-[#BE8080] text-black font-bold py-3 px-5 my-2 mx-10 rounded">
                社会人
            </button>
        </div>
    );
};

export default FooterOption;
