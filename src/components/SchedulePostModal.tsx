'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './../src/app/globals.css';
import { FaCirclePlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/client';
import axios from 'axios';
import useSWR from 'swr';


const customStyles: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(217, 217, 217, 0.70)',
    },

    content: {
        margin: 'auto auto',
        width: '35%',
        minWidth: '420px',
        height: '85%',
        borderRadius: '7%',
        border: '0px',
        padding: '30px 30px 15px 30px',
        backgroundColor: 'rgba(255,255,255,1)',
    },
};

const App: React.FC = () => {
    const { data: session } = useSession();
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [schedule, setSchedule] = useState([{ startTime: '', endTime: '', activity: '' }]);
    const [tags, setTags] = useState<string[]>([]);
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const userId = session?.user;
    const { data:profileData }: any = useSWR(`/api/profileData/${userId}`, axios);
    console.log("userId", userId);

    useEffect(() => {
        if (session) {
            const storage = getStorage();
            const imagePath = `userImages/${session.user.uid}/profile_picture.png`;
            const storageRef = ref(storage, imagePath);
            getDownloadURL(storageRef)
                .then((url) => {
                    setImageUrl(url);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [session]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        router.push('./');
    };

    const addScheduleField = () => {
        setSchedule([...schedule, { startTime: '', endTime: '', activity: '' }]);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(' ').filter((tag, index) => index < 5));
    };

    const validateInputs = () => {
        // カテゴリ, 詳細, および タグのチェック
        if (!category || !details || tags.length === 0) {
            setError('カテゴリ、詳細、およびタグは必須です。');
            return false;
        }
        // スケジュールのチェック
        for (let item of schedule) {
            if (!item.startTime || !item.endTime || !item.activity) {
                setError('スケジュールの時間と活動は必須です。');
                return false;
            }
            // 時間逆行のチェックを追加
            const startTime = new Date(`1970-01-01T${item.startTime}:00`);
            const endTime = new Date(`1970-01-01T${item.endTime}:00`);
            if (startTime >= endTime) {
                setError('終了時間は開始時間よりも後でなければなりません。');
                return false;
            }
        }
        for (let i = 0; i < schedule.length; i++) {
            const currentStart = new Date(`1970-01-01T${schedule[i].startTime}:00`);
            const currentEnd = new Date(`1970-01-01T${schedule[i].endTime}:00`);
            for (let j = i + 1; j < schedule.length; j++) {
                const compareStart = new Date(`1970-01-01T${schedule[j].startTime}:00`);
                const compareEnd = new Date(`1970-01-01T${schedule[j].endTime}:00`);
                if (
                    (currentStart >= compareStart && currentStart < compareEnd) ||
                    (currentEnd > compareStart && currentEnd <= compareEnd) ||
                    (compareStart >= currentStart && compareStart < currentEnd) ||
                    (compareEnd > currentStart && compareEnd <= currentEnd)
                ) {
                    setError('時間帯が重複しています。');
                    return false;
                }
            }
        }
        return true;
    };

    const saveToFirestore = async () => {
        setError(null);
        if (!validateInputs()) {
            return;
        }
        const now = new Date();
        try {
            const docRef = await addDoc(collection(db, 'userData'), {
                timestamp: now,
                userId: session?.user.uid,
                category,
                schedule,
                tags,
                details,
            });
            console.log('Document written with ID: ', docRef.id);
            setModalIsOpen(false);
            // 入力をリセット
            setSchedule([{ startTime: '', endTime: '', activity: '' }]);
            setTags([]);
            setDetails('');
            setCategory('');
        } catch (e) {
            console.error('Error adding document: ', e);
            setError('データの保存に失敗しました。');
        }
    };

    return (
        <div className="container mx-auto">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div className="relative inline-flex">
                        <select
                            className="border border-gray-5F rounded-xl text-gray-5F h-9 pr-3 pl-10 text-base bg-white hover:border-gray-400 focus:outline-none appearance-none"
                            style={{
                                backgroundImage: "url('/caret-down-solid.svg')",
                                backgroundPosition: 'left 10px center',
                                backgroundSize: '18px',
                                backgroundRepeat: 'no-repeat',
                                paddingLeft: '38px',
                                paddingRight: '16px',
                            }}
                        >
                            <option>カテゴリを選択</option>
                            <option value="大学生">大学生</option>
                            <option value="社会人">社会人</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>
                </div>
                {schedule.map((s, index) => (
                    // 時間差分も保存する
                    <div className="flex items-center justify-center my-2" key={index}>
                        <input
                            type="time"
                            value={s.startTime}
                            onChange={(e) =>
                                setSchedule([
                                    ...schedule.slice(0, index),
                                    {
                                        startTime: e.target.value,
                                        endTime: s.endTime,
                                        activity: s.activity,
                                    },
                                    ...schedule.slice(index + 1),
                                ])
                            }
                            className="border p-2 rounded-md text-sm"
                        />
                        <input
                            type="time"
                            value={s.endTime}
                            onChange={(e) =>
                                setSchedule([
                                    ...schedule.slice(0, index),
                                    {
                                        startTime: s.startTime,
                                        endTime: e.target.value,
                                        activity: s.activity,
                                    },
                                    ...schedule.slice(index + 1),
                                ])
                            }
                            className="border p-2 rounded-md mx-2 text-sm"
                        />
                        <input
                            type="text"
                            value={s.activity}
                            placeholder="やったことを入力"
                            onChange={(e) =>
                                setSchedule([
                                    ...schedule.slice(0, index),
                                    {
                                        startTime: s.startTime,
                                        endTime: s.endTime,
                                        activity: e.target.value,
                                    },
                                    ...schedule.slice(index + 1),
                                ])
                            }
                            className="border p-2 rounded-md mx-2 text-sm"
                        />
                    </div>
                ))}
                <div
                    onClick={addScheduleField}
                    className="flex items-center justify-center cursor-pointer text-base mt-6 mb-6 gap-3 text-kusumi-pink hover:text-[#a56e6e]"
                    style={{ cursor: 'pointer' }}
                >
                    <FaCirclePlus size={25} />
                    <span>スケジュールを追加</span>
                </div>
                <hr className="border-t border-gray-D9" />
                <div className="flex items-center justify-center mt-4 mb-2">
                    <input
                        type="text"
                        placeholder="タグをスペース区切りで入力（5個まで）"
                        onChange={handleTagChange}
                        className="border pt-2 pr-4 pb-2 pl-4 rounded-md text-sm text-gray-5F"
                    />
                </div>
                {tags.map((tag, index) => (
                    <span key={index} className="mx-1 text-blue-500">
                        #{tag}
                    </span>
                ))}
                <div className="flex items-center justify-center my-2">
                    <textarea
                        placeholder="詳細を入力"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                        className="w-11/12 h-28 p-2 border rounded-md mt-2 text-sm resize-none"
                    />
                </div>
                <div className="flex items-center justify-center my-2">
                    <button
                        onClick={saveToFirestore}
                        className="px-5 py-2 text-sm text-white bg-kusumi-pink rounded-3xl hover:bg-[#a56e6e] mt-3 mr-5 ml-auto"
                    >
                        投稿する
                    </button>
                </div>
                {error && <div className="text-red-500 text-center text-sm mt-3">{error}</div>}{' '}
            </Modal>
        </div>
    );
};

export default App;
