"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const TABS = [
  {
    id: "inventory",
    label: "01. Inventory Sync",
    code: `async function syncEdgeInventory(skus: string[]) {
  const store = await getAtomicStore('inventory');
  
  // Predict demand and pre-warm edge cache
  const demandGraph = await ai.analyze(skus);
  
  return store.distribute(skus, {
    strategy: 'geo-proximity',
    latencyTarget: '< 50ms',
    fallback: 'origin-main'
  });
}`,
    metric: "42ms Sync Time"
  },
  {
    id: "routing",
    label: "02. Edge Routing",
    code: `export const config = {
  runtime: 'edge',
  regions: ['iad1', 'sfo1', 'fra1', 'hnd1']
};

export default function EdgeRouter(req: Request) {
  const { country, city } = req.geo;
  const optimalNode = getNearestNode(country, city);
  
  return Response.redirect(optimalNode.url, 302);
}`,
    metric: "99.999% Uptime"
  },
  {
    id: "analytics",
    label: "03. Atomic Analytics",
    code: `// Zero-latency event streaming
const eventStream = new AtomicStream('user_actions');

eventStream.on('purchase', (event) => {
  // Fire and forget to data warehouse
  BigQuery.insertAsync('transactions', event);
  
  // Immediately update real-time dashboard
  Redis.incr(\`revenue:\${event.region}\`, event.amount);
});`,
    metric: "0ms UI Blocking"
  },
  {
    id: "order",
    label: "04. Order Flow",
    code: `function processOrder(cart: Cart) {
  return db.transaction(async (tx) => {
    // Optimistic locking for high-concurrency
    const lock = await tx.acquireLock(cart.items);
    
    if (!lock) throw new Error('Inventory conflict');
    
    await tx.deduct(cart.items);
    await tx.charge(cart.payment);
    
    return tx.commit();
  });
}`,
    metric: "10k TPS Capable"
  }
];

export function CommerceEngineExplorer() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const activeContent = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="commerce" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 select-none">
            Commerce <span className="text-[#FF3B3B]">Engine</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto select-none">
            Explore the robust foundation that powers our high-performance digital platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <GlassCard className="p-8 md:p-12 overflow-hidden flex flex-col min-h-[500px]">
            {/* Top Tabs */}
            <div className="w-full flex flex-wrap justify-center items-center gap-2 mb-10 border-b border-white/5 pb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-300 select-none ${
                    activeTab === tab.id
                      ? "bg-[#FF3B3B]/10 text-[#FF3B3B] border border-[#FF3B3B]/50"
                      : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="w-full relative flex flex-col items-center flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-3xl flex flex-col items-center"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
                    <span className="font-mono text-[#FF3B3B] tracking-widest uppercase text-sm">
                      {activeContent.metric}
                    </span>
                  </div>
                  
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 overflow-x-auto shadow-inner w-full text-left">
                    <pre className="font-mono text-sm leading-relaxed text-white/80">
                      <code>{activeContent.code}</code>
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
