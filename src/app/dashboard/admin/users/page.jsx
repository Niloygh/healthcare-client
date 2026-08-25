import ManageUsersTable from '@/component/dashboard/admin/ManageUsersTable';
import { allUser } from '@/lib/action/admin';
import React from 'react';

const UserPage = async () => {

    const users = await allUser();
    
    return (
        <div>
            <ManageUsersTable users={users}/>
        </div>
    );
};

export default UserPage;