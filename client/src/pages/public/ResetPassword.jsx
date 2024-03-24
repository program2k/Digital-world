import React, { memo, useState } from 'react';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../APIs/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        setPassword(event.target.value);
    };

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ token, password });
        if (response.success === true) {
            toast.success(response.message);
            navigate(`/${path.LOGIN}`);
        }
    };

    return (
        <div className='w-screen h-screen'>
            <img
                className="w-full absolute object-cover"
                src="https://t4.ftcdn.net/jpg/05/38/29/47/360_F_538294733_Lv5YDW2gZwyl5mRI05lSkfLvKWjf1iEQ.jpg"
                alt="back-ground"
            />
            <div className="absolute flex top-0 bottom-0 right-0 left-0 items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] border shadow-2xl">
                    <label htmlFor="email" className='text-main font-semibold text-[28px] flex flex-col items-center'>Enter your new password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full h-[50px] mt-4 pb-2 border outline-none placeholder:text-sm rounded-md"
                        placeholder="New password"
                        value={password}
                        onChange={handleOnChange}
                    />
                    <div className="flex flex-col mt-4 items-center justify-end w-full">
                        <Button name='Submit' handleOnClick={handleResetPassword} fw />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ResetPassword);