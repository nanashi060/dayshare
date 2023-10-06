'use client';

import { PieChart, Pie, Cell } from 'recharts';

export const CustomPieChart = () => {
    const schedule = [
        { name: '睡眠', startTime: 0, endTime: 11 },
        { name: '仕事', startTime: 11, endTime: 18 },
        { name: 'レクリエーション', startTime: 18, endTime: 24 },
    ];

    // 各アクティビティの時間を計算
    const data = schedule.map((item) => ({
        name: item.name,
        value: item.endTime - item.startTime,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderLabel = (props: any) => {
        // console.log("props", props);

        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={15}
                style={{ fontWeight: '900' }}
            >
                {data[index].name.length <= 5 ? (
                    data[index].name
                ) : (
                    <>
                        {data[index].name.substring(0, 5)}
                        <tspan x={x} dy="12">
                            {data[index].name.substring(5)}
                        </tspan>
                    </>
                )}
            </text>
        );
    };
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                isAnimationActive={false}
                startAngle={90}
                endAngle={-270}
                label={renderLabel}
                labelLine={false}
            >
                {data.map((item, index) => (
                    <>
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    </>
                ))}
            </Pie>
        </PieChart>
    );
};
