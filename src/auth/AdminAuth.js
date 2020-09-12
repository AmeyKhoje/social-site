import React from 'react';

const AdminAuth = () => {
    return (
        <div className="admin-cont">
            <div className="admin-auth">
                <div className="admin-auth_head text-center">
                    <h1>Admin Login</h1>
                </div>
                <div className="admin-login_form">
                    <div className="form-admin_login">
                        <form>
                            <div className="form-input_cont">
                                <div>
                                    <label htmlFor="email">Enter Email:</label>
                                </div>
                                <div>
                                    <input type="text" id="email" />
                                </div>
                            </div>
                            <div className="form-input_cont">
                                <div>
                                    <label htmlFor="email">Enter Email:</label>
                                </div>
                                <div>
                                    <input type="text" id="email" />
                                </div>
                            </div>
                            <div className="form-admin_login-submit">
                                <button type="btn">
                                    LOGIN ADMIN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAuth;
