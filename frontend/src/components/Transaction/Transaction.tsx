import React, { useEffect } from 'react'
import { formatCurrency } from '../../tools/UserTools';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../state/store/store';
import { useParams } from 'react-router-dom';
import { FetchPersonalAccountTransactions } from '../../state/Transaction/TransactionSlicer';

export default function Transactions() {
    const dispatch = useDispatch<AppDispatch>();
    // Accessing the transactions from your state
    const { transactions, Loading } = useSelector((state: RootState) => state.transactions);
    

    // 1. Loading State
    if (Loading) {
        return (
            <div className="mt-8 ml-2 flex items-center gap-3 text-slate-400 font-medium">
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                Updating ledger...
            </div>
        );
    }

    // 2. Empty State
    if (!transactions || transactions.length === 0) {
        return (
            <div className="mt-8 ml-2 p-8 bg-white/20 rounded-[2rem] border border-dashed border-slate-300 text-slate-400 font-medium italic text-center">
                No recent activity found for this account.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mt-8">
            <h3 className="text-xl font-bold text-slate-800 ml-2">Recent Activity</h3>
            <div className="bg-white/40 backdrop-blur-sm rounded-[2rem] border border-white/60 overflow-hidden shadow-xl shadow-red-900/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/5 text-slate-500">
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-nowrap">Transaction</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-nowrap">User</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-nowrap">Type</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-right text-nowrap">Amount</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-right text-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/50">
                            {transactions.map((x) => {
                                const {
                                    transectionId,
                                    userName,
                                    amountCents,
                                    transectionType,
                                    createdAt
                                } = x;

                                const isDeposit = transectionType.toLowerCase() === 'deposit';

                                return (
                                    <tr key={transectionId} className="hover:bg-white/40 transition-colors group">
                                        <td className="px-8 py-5 font-bold text-slate-900">
                                            #{transectionId}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-medium text-slate-600">
                                            {userName}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-semibold">
                                            <span className={`px-3 py-1 rounded-lg ${
                                                isDeposit 
                                                    ? 'bg-emerald-100/50 text-emerald-700' 
                                                    : 'bg-rose-100/50 text-rose-700'
                                            }`}>
                                                {transectionType}
                                            </span>
                                        </td>
                                        <td className={`px-8 py-5 text-right font-black ${
                                            isDeposit ? 'text-emerald-600' : 'text-rose-600'
                                        }`}>
                                            {isDeposit ? '+' : '-'} {formatCurrency(amountCents)}
                                        </td>
                                        <td className="px-8 py-5 text-right text-slate-500 font-medium">
                                            {createdAt.toString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}