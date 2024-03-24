import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import path from '../../utils/path';
import Swal from 'sweetalert2';

const FinalRegister = () => {
    const { status } = useParams();
    const navigate = useNavigate();

    const registerFailed = () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ban dang ki khong thanh cong',
        }).then(() => {
            navigate(`/${path.LOGIN}`);
        });
    }

    const registerSuccess = () => {
        Swal.fire({
          icon: 'success',
          title: 'Chuc mung',
          text: 'Ban dang ki thanh cong',
        }).then(() => {
            navigate(`/${path.LOGIN}`);
        });
    }

    useEffect(() => {
        if(status === 'failed') {
            registerFailed();
        }
        if(status === 'success') {
            registerSuccess();
        }
    }, []);

    return (
        <div className='h-screen w-screen bg-gray-100'>

        </div>
    );
};

export default memo(FinalRegister);