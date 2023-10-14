export const Loading = () => {
    const repeatElements = new Array(6).fill(null);

    return (
        <div className="grid-cols-3 mx-auto grid gap-y-10 place-items-center">
            {repeatElements.map((_, index) => (
                <div key={index}>
                    <div className="w-[200px] h-[40px] mx-auto rounded-md bg-slate-200 animate-pulse"></div>
                    <div className="w-[190px] h-[190px] rounded-full mx-auto bg-slate-200 animate-pulse mt-3"></div>
                    <div className=" w-[200px] h-[25px] rounded-md bg-slate-200 animate-pulse mt-1"></div>
                    <div className=" w-[40px] h-[25px] rounded-md bg-slate-200 animate-pulse mt-1"></div>
                </div>
            ))}
        </div>
    );
};
