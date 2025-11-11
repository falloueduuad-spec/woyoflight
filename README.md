WoyoFlight - Never Run Out of Electricity Again

**Hedera Africa Hackathon 2025 Submission**

![WoyoFlight Banner](https://img.shields.io/badge/Powered%20by-Hedera-purple)
![Status](https://img.shields.io/badge/Status-Active-success)

The Problem

8+ million Senegalese use Woyofal prepaid meters and face daily surprise blackouts from forgotten recharges. Each incident costs families 5,000+ FCFA in spoiled food and lost productivity.

Our Solution

WoyoFlight automates electricity management using Hedera smart contracts. Users set a threshold, and when balance drops low, our smart contract automatically purchases credit via Orange Money/Wave for just 1% commission (50 FCFA on 5,000 FCFA).

Technical Stack

- **Blockchain**: Hedera Hashgraph (SDK v2.73.2)
- **Smart Contracts**: Hedera Consensus Service (HCS)
- **Frontend**: React Native / TypeScript
- **Backend**: Node.js
- **Payment**: Orange Money, Wave integration

Core Implementation
```typescript
// Auto-purchase smart contract
async monitorAndRecharge(userId: string, threshold: number, amount: number) {
    if (userBalance < threshold && autoRechargeEnabled) {
        const payment = await processPayment(amount + commission);
        
        // Record on Hedera
        const tx = new TopicMessageSubmitTransaction()
            .setTopicId(woyoflightTopicId)
            .setMessage(JSON.stringify({
                type: "AUTO_PURCHASE",
                userId, amount, commission,
                timestamp: new Date().toISOString()
            }));
            
        const receipt = await tx.execute(client).getReceipt();
        return receipt.topicSequenceNumber;
    }
}
```

## 🎯 Why Hedera?

- **3-5 seconds finality** (vs 1-60 min other blockchains)
- **$0.0001 cost** per transaction (vs $5-50 Ethereum)
- **10,000+ TPS** (vs 7-30 other blockchains)
- **Only viable solution** for African micro-transactions at scale

Technical Feasibility

✅ **Senelec infrastructure confirmed**
- Datacenter Tier-III with Master Station operational
- HEXING CIU EV500 meters support CPL (Power Line Communication)
- Private API exists (Orange Money/Wave integration proven)

Business Model

- **1% commission** on automatic purchases only
- Manual purchases: **FREE**
- Year 3 projection: 150,000 users → 55.5M FCFA revenue
- Scalable to **20M+ users** across ECOWAS

Social Impact

- **Users**: Zero surprise blackouts, 5,000+ FCFA saved per incident
- **Senegal**: First blockchain utility management platform in Africa
- **ECOWAS**: Blueprint for 20+ countries

-Getting Started

-Installation
```bash
Clone repository
git clone: https://github.com/falloueduuad-spec/woyoflight
-Install dependencies
npm install

-Run development server
npm start
```

-Environment Variables
```env
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=302e020100...
```

## 📱 Demo

- **Live Demo**: https://woyoflight.onrender.com
- **Video Demo**: https://youtu.be/VuhBnapV6Ls
- **Presentation**: https://gamma.app/docs/WoyoFlight-duin442aznhsh5z

## 👥 Team

**Serigne Fallou ndao** - Founder & CEO

Seeking:
- Blockchain CTO (Hedera expert)
- Mobile Developer (React Native)
- AI/ML Engineer

## 📧 Contact

- **Email**: fallou.edu.uad@gmail.com
- **Location**: Dakar, Senegal
- **Hackathon**: Hedera Africa 2025

## 📄 License

MIT License - See LICENSE file for details

---

**"Woyof ak Light" - Powered by Hedera Hashgraph**

*From Dakar to the world: Electricity takes flight* ⚡
