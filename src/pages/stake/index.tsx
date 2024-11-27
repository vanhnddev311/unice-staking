import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu
interface APR {
  time: number;
  value: number;
}

interface PoolItem {
  id: string;
  pool_name: string;
  est_apr: APR[];
  token_address: string;
}

interface Pool {
  name: string;
  items: PoolItem[];
}

// Dữ liệu mẫu
const poolsData: Pool[] = [
  {
    name: 'Pool 1',
    items: [
      {
        id: '6',
        pool_name: 'Pool 1',
        est_apr: [{ time: 3, value: 15 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
      {
        id: '7',
        pool_name: 'Pool 2',
        est_apr: [{ time: 6, value: 30 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
      {
        id: '8',
        pool_name: 'Pool 3',
        est_apr: [{ time: 12, value: 60 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
    ],
  },
  {
    name: 'Pool 2',
    items: [
      {
        id: '3',
        pool_name: 'Pool 1',
        est_apr: [{ time: 3, value: 1 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
      {
        id: '4',
        pool_name: 'Pool 2',
        est_apr: [{ time: 6, value: 4 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
      {
        id: '5',
        pool_name: 'Pool 3',
        est_apr: [{ time: 12, value: 8 }],
        token_address: '0xb84c75479bb9e7cf635ebb216e13c159c2647444',
      },
    ],
  },
];

const App: React.FC = () => {
  // State để lưu duration được chọn
  const [selectedDurations, setSelectedDurations] = useState<{
    [key: number]: number | null;
  }>({});

  const handleSelectDuration = (poolIndex: number, duration: number) => {
    setSelectedDurations((prev) => ({ ...prev, [poolIndex]: duration }));
  };

  return (
    <div>
      {poolsData.map((pool, poolIndex) => (
        <div
          key={pool.name}
          style={{
            marginBottom: '20px',
            marginTop: '120px',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <h2>{pool.name}</h2>

          <div style={{ display: 'flex', gap: '10px' }}>
            {pool.items.flatMap((item) =>
              item.est_apr.map((apr) => (
                <button
                  key={`${item.id}-${apr.time}`}
                  style={{
                    padding: '10px 20px',
                    border: selectedDurations[poolIndex] === apr.time ? '2px solid blue' : '1px solid #ccc',
                    backgroundColor: '#000',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectDuration(poolIndex, apr.time)}
                >
                  {`${apr.time} months`}
                </button>
              )),
            )}
          </div>

          {/* Hiển thị APR tương ứng */}
          {selectedDurations[poolIndex] && (
            <div>
              <p>
                <strong>APR:</strong>{' '}
                {pool.items.flatMap((item) => item.est_apr).find((apr) => apr.time === selectedDurations[poolIndex])
                  ?.value || 0}
                %
              </p>
            </div>
          )}

          <button
            onClick={() => alert(`Stake in Pool ${pool.name} with duration ${selectedDurations[poolIndex]} months`)}
            disabled={!selectedDurations[poolIndex]}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: selectedDurations[poolIndex] ? 'blue' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: selectedDurations[poolIndex] ? 'pointer' : 'not-allowed',
            }}
          >
            Stake Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
