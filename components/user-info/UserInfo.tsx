interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <>
      <div className='text-end lh-sm m-2'>
        <div className='fw-bold '>{name}</div>
        <small className='text-muted d-block'>{email}</small>
      </div>
    </>
  );
};

export default UserInfo;
