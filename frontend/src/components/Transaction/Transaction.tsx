import { formatCurrency } from '../../tools/UserTools';
import { useSelector } from 'react-redux';
import { type RootState } from '../../state/store/store';

export default function Transactions() {
    const { transactions, Loading } = useSelector((state: RootState) => state.transactions);

    // 1. Loading State - Sharp & Minimal
    if (Loading) {
        return (
            <div className="mt-8 flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <div className="w-4 h-4 border border-slate-900 border-t-transparent animate-spin"></div>
                updating ledger...
            </div>
        );
    }

    // 2. Empty State - Sharp Border
    if (!transactions || transactions.length === 0) {
        return (
            <div className="mt-8 p-12 bg-white border border-slate-200 text-slate-400 text-xs font-medium lowercase text-center tracking-tight">
                no recent activity found for this account.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">recent activity</h3>
            
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">id</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">user</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">type</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
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
                                    <tr key={transectionId} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 text-xs font-mono text-slate-400">
                                            #{transectionId}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900 lowercase">
                                            {userName}
                                        </td>
                                        <td className="px-6 py-4 text-[11px] font-bold uppercase tracking-tighter">
                                            <span className={isDeposit ? 'text-emerald-500' : 'text-rose-500'}>
                                                {transectionType}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-medium tracking-tighter text-base ${
                                            isDeposit ? 'text-slate-900' : 'text-slate-900'
                                        }`}>
                                            {isDeposit ? '+' : '-'} {formatCurrency(amountCents)}
                                        </td>
                                        <td className="px-6 py-4 text-right text-[11px] text-slate-400 font-medium lowercase">
                                            {new Date(createdAt).toLocaleDateString()}
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