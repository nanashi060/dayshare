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

    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#FFC0CB',
        '#ADD8E6',
        '#90EE90',
        '#AE6FFF',
    ];

    const RADIAN = Math.PI / 180;
    const renderLabel = (props: any) => {
        // console.log("props", props);

        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + (radius + 17) * Math.cos(-midAngle * RADIAN);
        const y = cy + (radius + 10) * Math.sin(-midAngle * RADIAN);

        // 円グラフ内の文字の設定
        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                style={{ fontWeight: '600' }}
            >
                {filledSchedule[index].name.length <= 8 ? (
                    filledSchedule[index].name
                ) : (
                    <>
                        {filledSchedule[index].name.substring(0, 8)}
                        <tspan x={x} dy="8">
                            {filledSchedule[index].name.substring(8)}
                        </tspan>
                    </>
                )}
            </text>
        );
    };

    //円グラフ内のメモリの設定
    const renderMemoryLines = () => {
        const numLines = 24;
        const cx = 100;
        const cy = 100;
        const radius = 85;
        const lines = [];
        const hoursToDisplay = [0, 6, 12, 18];

        for (let i = 0; i < numLines; i++) {
            const angle = 360 - (i / numLines) * 360 + 90;
            const x1 = cx + radius * Math.cos(-angle * RADIAN);
            const y1 = cy + radius * Math.sin(-angle * RADIAN);
            const x2 = cx + (radius - 6) * Math.cos(-angle * RADIAN);
            const y2 = cy + (radius - 6) * Math.sin(-angle * RADIAN);
            const displayLabels = [0, 3, 6, 9, 12, 15, 18, 21];

            lines.push(
                <line
                    key={`line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#F5F5F5"
                    strokeWidth="2"
                />
            );
            if (displayLabels.includes(i)) {
                const labelX = cx + (radius + 8) * Math.cos(-angle * RADIAN) - 5;
                const labelY = cy + (radius + 8) * Math.sin(-angle * RADIAN) + 4.8;

                lines.push(
                    <text
                        fill="black"
                        key={`label-${i}`}
                        x={labelX}
                        y={labelY}
                        fontSize={10}
                        fontWeight={500}
                    >
                        {i % 24}
                    </text>
                );
            }
        }

        return lines;
    };

    //円グラフの設定
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
            {renderMemoryLines()}
        </PieChart>
    );
};
