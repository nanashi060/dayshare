'use client';

import { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

type Prop = { data: any };

export const CustomPieChart: FC<Prop> = ({ data: tmpData }) => {
    // const schedule = [
    //     { name: '睡眠', startTime: 0, endTime: 11 },
    //     { name: '仕事', startTime: 11, endTime: 18 },
    //     { name: 'レクリエーション', startTime: 18, endTime: 24 },
    // ];

    function timeToDegree(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);

        if (
            hours < 0 ||
            hours >= 24 ||
            minutes < 0 ||
            minutes >= 60 ||
            isNaN(hours) ||
            isNaN(minutes)
        ) {
            throw new Error('Invalid time format');
        }

        const totalMinutes = hours * 60 + minutes;
        const degrees = (totalMinutes / (24 * 60)) * 360;

        return degrees;
    }

    const startAngle = timeToDegree(tmpData.schedule[0].startTime);
    console.log('startAngle', startAngle);

    const convertTo24Hour = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    };

    // 各アクティビティの時間を計算;
    // const data = tmpData.schedule.map((item: any) => ({
    //     name: item.activity,
    //     value: convertTo24Hour(item.endTime) - convertTo24Hour(item.startTime),
    // }));

    // 空き時間を計算
    const filledSchedule: any[] = [];
    let lastEndTime = 0;

    tmpData.schedule.forEach((item: any) => {
        const startTime = convertTo24Hour(item.startTime);
        const endTime = convertTo24Hour(item.endTime);
        const duration = () => {
            if (endTime < startTime) {
                return endTime + 24 - startTime;
            } else {
                return endTime - startTime;
            }
        };

        if (startTime > lastEndTime) {
            filledSchedule.push({
                name: '',
                value: duration,
                isEmpty: true,
            });
        }

        filledSchedule.push({
            name: item.activity,
            value: duration,
            isEmpty: false,
        });

        lastEndTime = endTime;
    });

    if (lastEndTime < 24) {
        filledSchedule.push({
            name: '',
            value: 24 - lastEndTime,
            isEmpty: true,
        });
    }

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
                cx="50%"
                cy="50%"
                outerRadius={85}
                isAnimationActive={false}
                startAngle={startAngle}
                endAngle={startAngle + 360}
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
