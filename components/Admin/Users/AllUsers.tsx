"use client"

import React, { useState } from 'react'
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';


interface User {
    fullName: string | null;
    email: string;
    isVerified: boolean;
    isMentor: boolean | null;
    createdAt: Date;
    role: string;
    status: string;
    username: string;
}

const AllUsers = ({ allUsers, currentPage, totalPages, totalUsers }: { allUsers: User[], currentPage: number, totalPages: number, totalUsers: number }) => {
    const router = useRouter();

    const handlePageChange = (page: number) => {
        router.push(`/admin/users?page=${page}`)
    }
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const filteredUsers = allUsers.filter(user => {
        return (
            user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ) && (
                (statusFilter ? user.status === statusFilter.toUpperCase() : true)
            ) && (
                (roleFilter ? user.role === roleFilter.toUpperCase() : true)
            );
    });


    const getStatusBadge = (status: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case 'active':
                return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
            case 'inactive':
                return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Inactive</span>;
            case 'suspended':
                return <span className={`${baseClasses} bg-red-100 text-red-800`}>Suspended</span>;
            default:
                return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
        }
    };

    const getRoleBadge = (role: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        switch (role) {
            case 'ADMIN':
                return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Admin</span>;
            case 'USER':
                return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>User</span>;
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
                    <p className="text-gray-600 mt-2">Manage and view all system users</p>

                </div>

                <div className="bg-white rounded-sm border mb-8 ">
                    <div className="p-4 flex items-center">
                        <Input placeholder="Search users by name, username, or email"
                            value={searchQuery} onChange={handleSearch}>
                        </Input>
                        <select name="status" className="ml-4 p-2 border rounded-md" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="">Filter by status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <select name="role" className="ml-4 p-2 border rounded-md" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                            <option value="">Filter by role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    <Table className="border">
                        <TableCaption className="text-gray-700 pb-4 font-medium">
                            Total Users: {totalUsers}
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="[&>th]:border-r last:border-r-0">
                                <TableHead className="w-[100px]">S/N</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead >Joined Date</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user: User, idx: number) => (
                                <TableRow key={user.email} className="[&>td]:border-r last:border-r-0">
                                    <TableCell className="font-medium">{idx + 1}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{user.fullName || 'N/A'}</div>
                                            <div className="text-sm text-gray-500">@{user.username}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell className="text-right">
                                        {formatDate(user.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => router.push(`/dashboard/admin/users/${user.username}`)}
                                         variant={"outline"} size={"sm"}>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableFooter>
                            <TableRow className="*:border-r last:border-r-0">
                                <TableCell colSpan={7}>
                                    <div className="w-full flex justify-between items-center">
                                        <Button
                                            variant={"outline"}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage <= 1}
                                        >
                                            Prev
                                        </Button>
                                        <span>Page {currentPage} of {totalPages} (Showing {filteredUsers.length} users on this page)
                                        </span>
                                        <Button
                                            variant={"outline"}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage >= totalPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default AllUsers