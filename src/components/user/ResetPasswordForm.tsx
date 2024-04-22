import { clientSupabase } from '@/utils/supabase/client';
import { useState } from 'react';

const ResetPasswordForm = () => {
  const [userId, setUserId] = useState('');
  const onResetPassword = async () => {
    try {
      const { data, error } = await clientSupabase.auth.resetPasswordForEmail(userId);
      console.log(data, 'data');
      if (!error) {
        alert('비밀번호 재설정 이메일이 발송되었습니다.');
        setUserId('');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    }
  };

  return (
    <label>
      <input
        className="p-5 border border-[#A1A1AA] placeholder:text-[#A1A1AA] placeholder:text-[14px] rounded-lg focus:outline-none focus:border-[#8F5DF4] w-full"
        type="email"
        name="userId"
        placeholder="이메일을 입력해주세요."
        onChange={(e) => setUserId(e.target.value)}
        required
      />
    </label>
  );
};

export default ResetPasswordForm;