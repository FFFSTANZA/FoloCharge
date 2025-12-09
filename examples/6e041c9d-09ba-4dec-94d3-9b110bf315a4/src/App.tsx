import React, { useState } from 'react';
import { Battery, Lightbulb, Settings2, RefreshCw, Zap, Gauge, FlaskConical, AlertCircle, Thermometer, AudioWaveform as Waveform, Ruler, Power } from 'lucide-react';

interface CircuitState {
  voltage: number;
  resistance: number;
  current: number;
  power: number;
  temperature: number;
  efficiency: number;
  selectedComponent: string | null;
}

function App() {
  const [circuit, setCircuit] = useState<CircuitState>({
    voltage: 12,
    resistance: 100,
    current: 0.12,
    power: 1.44,
    temperature: 25,
    efficiency: 95,
    selectedComponent: null
  });

  const [showWarning, setShowWarning] = useState(false);

  const calculateCircuitValues = (voltage: number, resistance: number) => {
    const current = Number((voltage / resistance).toFixed(3));
    const power = Number((voltage * current).toFixed(2));
    const temperature = Number((25 + power * 0.5).toFixed(1));
    const efficiency = Number((95 - power * 0.1).toFixed(1));
    
    return { current, power, temperature, efficiency };
  };

  const handleVoltageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const voltage = parseFloat(e.target.value);
    const values = calculateCircuitValues(voltage, circuit.resistance);
    
    setShowWarning(values.power > 100);
    setCircuit(prev => ({
      ...prev,
      voltage,
      ...values
    }));
  };

  const handleResistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const resistance = parseFloat(e.target.value);
    const values = calculateCircuitValues(circuit.voltage, resistance);
    
    setShowWarning(values.power > 100);
    setCircuit(prev => ({
      ...prev,
      resistance,
      ...values
    }));
  };

  const handleComponentClick = (component: string) => {
    setCircuit(prev => ({
      ...prev,
      selectedComponent: prev.selectedComponent === component ? null : component
    }));
  };

  const getComponentDetails = () => {
    switch (circuit.selectedComponent) {
      case 'battery':
        return {
          title: '电源详情',
          specs: [
            { label: '输出电压', value: `${circuit.voltage}V` },
            { label: '最大输出功率', value: '500W' },
            { label: '内阻', value: '0.1Ω' }
          ]
        };
      case 'resistor':
        return {
          title: '电阻详情',
          specs: [
            { label: '阻值', value: `${circuit.resistance}Ω` },
            { label: '功耗', value: `${circuit.power}W` },
            { label: '温度系数', value: '±100ppm/°C' }
          ]
        };
      case 'load':
        return {
          title: '负载详情',
          specs: [
            { label: '功率', value: `${circuit.power}W` },
            { label: '工作电压', value: `${circuit.voltage}V` },
            { label: '发光效率', value: `${circuit.efficiency}%` }
          ]
        };
      default:
        return null;
    }
  };

  const componentDetails = getComponentDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Settings2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">专业电路分析工具</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左侧控制面板 */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">参数控制</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      电压调节 (V)
                    </label>
                    <div className="flex items-center gap-2">
                      <Battery className="w-5 h-5 text-yellow-500" />
                      <input
                        type="range"
                        min="0"
                        max="48"
                        step="0.1"
                        value={circuit.voltage}
                        onChange={handleVoltageChange}
                        className="flex-1"
                      />
                      <span className="w-16 text-right font-mono">{circuit.voltage}V</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      电阻调节 (Ω)
                    </label>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-orange-500" />
                      <input
                        type="range"
                        min="1"
                        max="2000"
                        step="1"
                        value={circuit.resistance}
                        onChange={handleResistanceChange}
                        className="flex-1"
                      />
                      <span className="w-16 text-right font-mono">{circuit.resistance}Ω</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">实时测量</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600">电流</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-indigo-900">{circuit.current} A</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Power className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-gray-600">功率</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-indigo-900">{circuit.power} W</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-gray-600">温度</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-indigo-900">{circuit.temperature}°C</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-600">效率</span>
                    </div>
                    <p className="text-2xl font-mono font-bold text-indigo-900">{circuit.efficiency}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 中间电路图 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">电路示意图</h2>
              <div className="aspect-square bg-white rounded-lg border-2 border-gray-200 p-4 relative">
                {/* 电路连线 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* 主线路 - 上方水平线 */}
                    <div className={`absolute w-full h-0.5 top-1/2 -translate-y-1/2 ${circuit.current > 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    
                    {/* 垂直连接线 - 左侧 */}
                    <div className={`absolute w-0.5 h-24 left-0 top-1/2 ${circuit.current > 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    
                    {/* 垂直连接线 - 右侧 */}
                    <div className={`absolute w-0.5 h-24 right-0 top-1/2 ${circuit.current > 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    
                    {/* 底部水平线 */}
                    <div className={`absolute w-full h-0.5 bottom-0 ${circuit.current > 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    
                    {/* 电池 */}
                    <div 
                      className="absolute -left-4 top-1/2 -translate-y-1/2 cursor-pointer group"
                      onClick={() => handleComponentClick('battery')}
                    >
                      <div className="p-2 bg-white border-2 border-yellow-500 rounded-lg group-hover:shadow-lg transition-shadow">
                        <Battery className={`w-8 h-8 ${circuit.voltage > 0 ? 'text-yellow-500' : 'text-gray-400'}`} />
                      </div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 text-xs font-medium rounded shadow-sm">
                        {circuit.voltage}V
                      </div>
                    </div>

                    {/* 负载 */}
                    <div 
                      className="absolute -right-4 top-1/2 -translate-y-1/2 cursor-pointer group"
                      onClick={() => handleComponentClick('load')}
                    >
                      <div className="p-2 bg-white border-2 border-blue-500 rounded-lg group-hover:shadow-lg transition-shadow">
                        <Lightbulb className={`w-8 h-8 ${circuit.current > 0 ? 'text-yellow-400' : 'text-gray-400'}`} />
                      </div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 text-xs font-medium rounded shadow-sm">
                        {circuit.power}W
                      </div>
                    </div>

                    {/* 电阻 */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 cursor-pointer group"
                      onClick={() => handleComponentClick('resistor')}
                    >
                      <div className="p-2 bg-white border-2 border-orange-500 rounded-lg group-hover:shadow-lg transition-shadow">
                        <RefreshCw className="w-8 h-8 text-orange-500" />
                      </div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 text-xs font-medium rounded shadow-sm">
                        {circuit.resistance}Ω
                      </div>
                    </div>

                    {/* 连接点 */}
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full right-0 top-1/2 translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-0 bottom-0 -translate-x-1/2" />
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full right-0 bottom-0 translate-x-1/2" />

                    {/* 测量点 */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-1 bg-blue-100 rounded-full">
                      <Ruler className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 p-1 bg-red-100 rounded-full">
                      <Thermometer className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="absolute -bottom-4 right-1/4 p-1 bg-purple-100 rounded-full">
                      <Waveform className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧分析面板 */}
            <div className="space-y-6">
              {/* 组件详情面板 */}
              {componentDetails && (
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{componentDetails.title}</h3>
                  <div className="space-y-4">
                    {componentDetails.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{spec.label}</span>
                        <span className="font-mono font-medium text-blue-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 性能分析 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">性能分析</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      工作温度
                    </label>
                    <div className="flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-red-500" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${(circuit.temperature / 100) * 100}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-mono">{circuit.temperature}°C</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      电路效率
                    </label>
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-green-500" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${circuit.efficiency}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-mono">{circuit.efficiency}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {showWarning && (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 text-red-800">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">高功率警告</h3>
                      <p className="text-sm">当前功率超过100W，请注意：</p>
                      <ul className="text-sm list-disc list-inside mt-2">
                        <li>检查负载承受能力</li>
                        <li>确保散热措施充分</li>
                        <li>监控温度变化</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">电路参数说明</h3>
                <div className="space-y-4 text-sm text-blue-800">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold mb-1">欧姆定律</p>
                    <p className="font-mono">I = V/R = {circuit.current}A</p>
                    <p className="text-xs mt-1 text-gray-600">电流 = 电压/电阻</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold mb-1">功率计算</p>
                    <p className="font-mono">P = V×I = {circuit.power}W</p>
                    <p className="text-xs mt-1 text-gray-600">功率 = 电压×电流</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold mb-1">温度影响</p>
                    <p className="font-mono">T = 25°C + {(circuit.power * 0.5).toFixed(1)}°C</p>
                    <p className="text-xs mt-1 text-gray-600">基础温度 + 功率影响</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;