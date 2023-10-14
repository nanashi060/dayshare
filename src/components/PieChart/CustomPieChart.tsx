'use client';

import { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type Prop = { data: any };

export const CustomPieChart: FC<Prop> = ({ data: tmpData }) => {
    const convertTo24Hour = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    };

    // 空き時間を計算
    const filledSchedule: any[] = [];
    let lastEndTime = 0;

    tmpData.schedule.forEach((item: any) => {
        const startTime = convertTo24Hour(item.startTime);
        const endTime = convertTo24Hour(item.endTime);

        //前の活動終了時間と現在の活動開始時間が異なる場合は空き時間をプッシュ
        if (startTime > lastEndTime) {
            filledSchedule.push({
                name: '',
                value: startTime - lastEndTime,
                isEmpty: true,
            });
        }
        //現在の活動情報をプッシュ
        filledSchedule.push({
            name: item.activity,
            value: endTime - startTime,
            isEmpty: false,
        });

        lastEndTime = endTime;
    });
    //最後の活動終了時間から24時までの空き時間をプッシュ
    if (lastEndTime < 24) {
        filledSchedule.push({
            name: '',
            value: 24 - lastEndTime,
            isEmpty: true,
        });
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8042', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderLabel = (props: any) => {
        // console.log("props", props);
        //innnerRadiusとouterRadius両方ともいらない
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
                fontSize={10}
                style={{ fontWeight: '900' }}
            >
                {filledSchedule[index].name.length <= 5 ? (
                    filledSchedule[index].name
                ) : (
                    <>
                        {filledSchedule[index].name.substring(0, 5)}
                        <tspan x={x} dy="12">
                            {filledSchedule[index].name.substring(5)}
                        </tspan>
                    </>
                )}
            </text>
        );
    };

    return (
        <PieChart width={200} height={200}>
            <Pie
                data={filledSchedule}
                dataKey="value"
                nameKey="name"
                startAngle={90} // 0時の位置を360度として開始
                endAngle={-270} // 24時の位置を360度として終了
                cx="50%"
                cy="50%"
                outerRadius={85}
                isAnimationActive={false}
                label={renderLabel}
                labelLine={false}
            >
                {filledSchedule.map((item, index) => (
                    <>
                        <Cell
                            key={`cell-${index}`}
                            fill={item.isEmpty ? '#E0E0E0' : COLORS[index % COLORS.length]}
                        />
                    </>
                ))}
            </Pie>
        </PieChart>
    );
};
