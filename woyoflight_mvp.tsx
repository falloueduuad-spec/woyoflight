import React, { useState, useEffect } from 'react';
import { Bell, Zap, BarChart3, Settings, CreditCard, AlertTriangle, CheckCircle, Smartphone, TrendingUp, Clock } from 'lucide-react';

const WoyoFlightMVP = () => {
  const [currentBalance, setCurrentBalance] = useState(25.5);
  const [threshold, setThreshold] = useState(10.0);
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(true);
  const [rechargeAmountFCFA, setRechargeAmountFCFA] = useState(5000);
  const [rechargeKWH, setRechargeKWH] = useState(50.0);
  const [commission, setCommission] = useState(50);
  const [isRecharging, setIsRecharging] = useState(false);
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      type: 'AUTO_PURCHASE', 
      amountFCFA: 5000, 
      commission: 50,
      totalPaid: 5050,
      kwh: 50.0, 
      date: '2025-10-01', 
      status: 'success', 
      hederaProof: 'HCS:0.0.123456@15',
      code: '68328297538976303752'
    },
    { 
      id: 2, 
      type: 'MANUAL_PURCHASE', 
      amountFCFA: 3000,
      commission: 0,
      totalPaid: 3000,
      kwh: 30.0, 
      date: '2025-09-25', 
      status: 'success', 
      hederaProof: 'HCS:0.0.123456@12',
      code: '45167238945612347856'
    }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [woyoPoints, setWoyoPoints] = useState(245);
  const [predictedDays, setPredictedDays] = useState(25);
  const [meterNumber] = useState('1441-0961-716');

  useEffect(() => {
    setCommission(Math.round(rechargeAmountFCFA * 0.01));
  }, [rechargeAmountFCFA]);

  useEffect(() => {
    if (currentBalance <= threshold && autoRechargeEnabled && !isRecharging) {
      triggerAutoRecharge();
    }
  }, [currentBalance, threshold, autoRechargeEnabled]);

  const triggerAutoRecharge = async () => {
    setIsRecharging(true);
    
    setTimeout(() => {
      const totalCharged = rechargeAmountFCFA + commission;
      const generatedCode = generateWoyofalCode();
      
      const newTransaction = {
        id: Date.now(),
        type: 'AUTO_PURCHASE',
        amountFCFA: rechargeAmountFCFA,
        commission: commission,
        totalPaid: totalCharged,
        kwh: rechargeKWH,
        date: new Date().toISOString().split('T')[0],
        status: 'success',
        hederaProof: `HCS:0.0.123456@${Math.floor(Math.random() * 100)}`,
        code: generatedCode
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setCurrentBalance(prev => prev + rechargeKWH);
      const pointsEarned = Math.floor(rechargeAmountFCFA * 0.01);
      setWoyoPoints(prev => prev + pointsEarned);
      setIsRecharging(false);
      
      alert(`✅ Auto-purchase successful!\n\n💰 Total charged: ${totalCharged.toLocaleString()} FCFA\n   (${rechargeAmountFCFA.toLocaleString()} + ${commission} FCFA commission)\n\n⚡ Credit added: ${rechargeKWH} KWH\n🪙 WoyoPoints earned: ${pointsEarned}\n🔑 Your code: ${generatedCode}\n⛓️ Hedera proof: ${newTransaction.hederaProof}\n\n📱 Go tap your code on the meter!`);
    }, 3000);
  };

  const generateWoyofalCode = () => {
    return Math.floor(Math.random() * 100000000000000000000).toString().substring(0, 20);
  };

  const manualRecharge = () => {
    const amount = 3000;
    const kwh = 30.0;
    const generatedCode = generateWoyofalCode();
    
    const newTransaction = {
      id: Date.now(),
      type: 'MANUAL_PURCHASE',
      amountFCFA: amount,
      commission: 0,
      totalPaid: amount,
      kwh: kwh,
      date: new Date().toISOString().split('T')[0],
      status: 'success',
      hederaProof: `HCS:0.0.123456@${Math.floor(Math.random() * 100)}`,
      code: generatedCode
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setCurrentBalance(prev => prev + kwh);
    const pointsEarned = Math.floor(amount * 0.005);
    setWoyoPoints(prev => prev + pointsEarned);
    
    alert(`✅ Manual purchase!\n\n💰 Paid: ${amount.toLocaleString()} FCFA (FREE - 0% commission)\n⚡ Added: ${kwh} KWH\n🪙 Earned: ${pointsEarned} WoyoPoints\n🔑 Code: ${generatedCode}`);
  };

  const HomeScreen = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm">Current Balance</p>
            <p className="text-4xl font-bold">{currentBalance.toFixed(1)} KWH</p>
            <p className="text-sm text-blue-200 mt-1">≈ {(currentBalance * 100).toLocaleString()} FCFA</p>
          </div>
          <Zap className="w-16 h-16 text-yellow-300" />
        </div>
        
        <div className="flex items-center justify-between text-sm bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${autoRechargeEnabled ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span>Auto-purchase: {autoRechargeEnabled ? 'ON' : 'OFF'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>~{predictedDays} days left</span>
          </div>
        </div>
      </div>

      {currentBalance <= threshold && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-800">Critical: Low Balance!</p>
              <p className="text-red-600 text-sm">Below {threshold} KWH threshold</p>
              {autoRechargeEnabled && (
                <p className="text-red-700 font-medium mt-2">
                  {isRecharging ? '⚡ Auto-purchasing now...' : '⚡ Auto-purchase will trigger'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {autoRechargeEnabled && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-green-800">Auto-Purchase Active</p>
              <p className="text-green-700 text-sm">Never run out of electricity</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-3 pt-3 border-t border-green-200 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600">Trigger at</p>
              <p className="font-bold text-gray-800">{threshold} KWH</p>
            </div>
            <div>
              <p className="text-gray-600">Purchase</p>
              <p className="font-bold text-gray-800">{rechargeAmountFCFA.toLocaleString()} FCFA</p>
            </div>
            <div>
              <p className="text-gray-600">Commission (1%)</p>
              <p className="font-bold text-green-600">{commission} FCFA</p>
            </div>
            <div>
              <p className="text-gray-600">Total charged</p>
              <p className="font-bold text-gray-800">{(rechargeAmountFCFA + commission).toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-yellow-800">WoyoPoints Balance</p>
            <p className="text-3xl font-bold text-yellow-600">{woyoPoints}</p>
            <p className="text-sm text-yellow-700 mt-1">= {(woyoPoints * 0.1).toFixed(1)} KWH free</p>
          </div>
          <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center text-3xl">
            🪙
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-green-400 rounded-lg p-4 font-mono border-4 border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">HEXING CIU EV500 - {meterNumber}</p>
          <div className="text-5xl font-bold bg-gray-900 p-4 rounded border-2 border-gray-600 tracking-wider">
            {currentBalance.toFixed(0).padStart(3, '0')}
          </div>
          <p className="text-xs text-gray-400 mt-2">KWH REMAINING</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={manualRecharge}
          className="bg-white border-2 border-green-500 rounded-lg p-4 text-center hover:bg-green-50 transition-all shadow-md"
        >
          <CreditCard className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <p className="font-semibold text-gray-800">Manual Buy</p>
          <p className="text-sm text-green-600">3,000 FCFA</p>
          <p className="text-xs text-gray-500 mt-1">0% commission</p>
        </button>
        
        <button className="bg-white border-2 border-blue-500 rounded-lg p-4 text-center hover:bg-blue-50 transition-all shadow-md">
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <p className="font-semibold text-gray-800">Orange Money</p>
          <p className="text-sm text-blue-600">Linked</p>
        </button>
      </div>

      <button 
        onClick={() => setCurrentBalance(8.5)}
        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 font-bold hover:from-red-600 hover:to-orange-600 shadow-lg"
      >
        🚨 DEMO: Trigger Auto-Purchase (Set 8.5 KWH)
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800 font-medium">
          Pay just {commission} FCFA to never worry about electricity
        </p>
        <p className="text-xs text-blue-600 mt-1">
          One blackout = 5,000+ FCFA loss. Auto-purchase saves money!
        </p>
      </div>
    </div>
  );

  const HistoryScreen = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      
      {transactions.map(tx => (
        <div key={tx.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'AUTO_PURCHASE' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {tx.type === 'AUTO_PURCHASE' ? 
                  <Zap className="w-5 h-5 text-blue-600" /> :
                  <CreditCard className="w-5 h-5 text-green-600" />
                }
              </div>
              <div>
                <p className="font-semibold">{tx.type === 'AUTO_PURCHASE' ? 'Auto-Purchase' : 'Manual'}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">+{tx.kwh} KWH</p>
              <CheckCircle className="w-4 h-4 text-green-500 inline" />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Credit:</span>
              <span className="font-semibold">{tx.amountFCFA.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Commission:</span>
              <span className={`font-semibold ${tx.commission > 0 ? 'text-blue-600' : 'text-green-600'}`}>
                {tx.commission > 0 ? `${tx.commission} FCFA` : 'FREE'}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold">
              <span>Total paid:</span>
              <span>{tx.totalPaid.toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-2">
            <p className="text-xs text-yellow-700 font-semibold">Woyofal Code:</p>
            <p className="font-mono text-sm text-yellow-900 break-all">{tx.code}</p>
          </div>
          
          <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
            <p className="text-purple-700"><strong>Hedera:</strong> {tx.hederaProof}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const SettingsScreen = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>
      
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Enable Auto-Purchase</p>
            <p className="text-sm text-gray-600">1% commission</p>
          </div>
          <button
            onClick={() => setAutoRechargeEnabled(!autoRechargeEnabled)}
            className={`w-14 h-7 rounded-full relative ${
              autoRechargeEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform ${
              autoRechargeEnabled ? 'translate-x-7' : 'translate-x-0.5'
            }`}></div>
          </button>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg p-4">
        <label className="font-semibold block mb-2">Threshold (KWH)</label>
        <input
          type="number"
          step="0.5"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full border-2 rounded-lg px-4 py-3 text-lg font-semibold"
        />
      </div>
      
      <div className="bg-white border rounded-lg p-4">
        <label className="font-semibold block mb-2">Purchase Amount</label>
        <select
          value={rechargeAmountFCFA}
          onChange={(e) => {
            const amt = Number(e.target.value);
            setRechargeAmountFCFA(amt);
            setRechargeKWH(amt / 100);
          }}
          className="w-full border-2 rounded-lg px-4 py-3 text-lg font-semibold"
        >
          <option value={2000}>2,000 FCFA → 20 KWH</option>
          <option value={3000}>3,000 FCFA → 30 KWH</option>
          <option value={5000}>5,000 FCFA → 50 KWH</option>
          <option value={10000}>10,000 FCFA → 100 KWH</option>
        </select>
        <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
          <div className="flex justify-between mb-1">
            <span>Credit:</span>
            <span className="font-semibold">{rechargeAmountFCFA.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Commission (1%):</span>
            <span className="font-semibold text-blue-600">{commission} FCFA</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>Total:</span>
            <span className="text-blue-700">{(rechargeAmountFCFA + commission).toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Meter Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Number:</span>
            <span className="font-mono font-semibold">{meterNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Model:</span>
            <span className="font-semibold">HEXING CIU EV500</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-purple-600" />
          <div>
            <p className="font-semibold text-purple-800">Hedera Active</p>
            <p className="text-sm text-purple-600">All transactions secured</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsScreen = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Analytics</h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
        <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
        <p className="font-semibold text-blue-800">AI Prediction</p>
        <div className="text-center bg-white rounded-lg p-4 mt-3">
          <p className="text-5xl font-bold text-blue-600">{predictedDays}</p>
          <p className="text-gray-600 mt-1">days remaining</p>
          <p className="text-sm text-gray-500 mt-2">{(currentBalance/predictedDays).toFixed(1)} KWH/day avg</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold">{(currentBalance/predictedDays).toFixed(1)}</p>
          <p className="text-sm text-gray-600">KWH/day</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold">{transactions.length}</p>
          <p className="text-sm text-gray-600">Purchases</p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-3">Savings This Month</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Blackouts prevented:</span>
            <span className="font-bold text-green-700">3</span>
          </div>
          <div className="flex justify-between">
            <span>Food spoilage avoided:</span>
            <span className="font-bold text-green-700">15,000 FCFA</span>
          </div>
          <div className="flex justify-between">
            <span>Commission paid:</span>
            <span className="font-bold text-blue-600">150 FCFA</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
            <span>Net savings:</span>
            <span className="text-green-700">14,850 FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen pb-20">
      <div className="bg-white shadow-sm px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">WoyoFlight</h1>
            <p className="text-sm text-gray-600">Woyof ak Light</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            {currentBalance <= threshold && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'history' && <HistoryScreen />}
        {activeTab === 'analytics' && <AnalyticsScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
        <div className="grid grid-cols-4">
          {[
            { key: 'home', icon: Zap, label: 'Home' },
            { key: 'history', icon: CreditCard, label: 'History' },
            { key: 'analytics', icon: BarChart3, label: 'Stats' },
            { key: 'settings', icon: Settings, label: 'Settings' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center py-3 ${
                activeTab === key ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {isRecharging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-sm mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="font-bold text-lg">Processing Auto-Purchase...</p>
            <p className="text-sm text-gray-600 mt-2">Hedera smart contract executing</p>
            <p className="text-xs text-gray-500 mt-2">{(rechargeAmountFCFA + commission).toLocaleString()} FCFA total</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WoyoFlightMVP;