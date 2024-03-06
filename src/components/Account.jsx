const Account = ({ auth })=> {

  
  return (
    <div className="account-container">
      Hello, { auth.email }!
    </div>
  );
};

export default Account;