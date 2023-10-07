'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './../src/app/globals.css';
import { FaPlusCircle } from 'react-icons/fa';

const App: React.FC = () => {
    const { data: session } = useSession();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [schedule, setSchedule] = useState([{ time: '', activity: '' }]);
    const [tags, setTags] = useState<string[]>([]);
    const [details, setDetails] = useState('');

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
    };

    const addScheduleField = () => {
        setSchedule([...schedule, { time: '', activity: '' }]);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(' ').filter((tag, index) => index < 5));
    };

    return (
        <div className="container mx-auto">
            {session && (
                <button
                    onClick={openModal}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                    モーダルを開く
                </button>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
                <div className="flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mr-4"
                    />
                    <div className="relative inline-flex">
                        <select
                            className="border border-gray-300 rounded-full text-gray-600 h-10 pr-3 pl-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                            style={{
                                backgroundImage: "url('/caret-down-solid.svg')",
                                backgroundPosition: 'left 10px center',
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
                            value={s.time}
                            onChange={(e) =>
                                setSchedule([
                                    ...schedule.slice(0, index),
                                    { time: e.target.value, activity: s.activity },
                                    ...schedule.slice(index + 1),
                                ])
                            }
                            className="border p-2 rounded-md"
                        />
                        <input
                            type="text"
                            value={s.activity}
                            placeholder="やったことを入力"
                            onChange={(e) =>
                                setSchedule([
                                    ...schedule.slice(0, index),
                                    { time: s.time, activity: e.target.value },
                                    ...schedule.slice(index + 1),
                                ])
                            }
                            className="border p-2 rounded-md mx-2"
                        />
                    </div>
                ))}
                <div
                    onClick={addScheduleField}
                    className="flex items-center justify-center cursor-pointer"
                    style={{ color: '#BE8080', cursor: 'pointer' }}
                >
                    <FaPlusCircle />
                    <span>スケジュールを追加</span>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="flex items-center justify-center my-2">
                    <input
                        type="text"
                        placeholder="タグをスペース区切りで入力（5個まで）"
                        onChange={handleTagChange}
                        className="border p-2 rounded-md"
                    />
                    {tags.map((tag, index) => (
                        <span key={index} className="mx-1 text-blue-500">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-center my-2">
                    <textarea
                        placeholder="詳細を入力"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                        className="w-full h-24 p-2 border rounded-md mt-2"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default App;
