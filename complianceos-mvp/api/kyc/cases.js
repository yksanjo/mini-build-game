// Vercel Serverless Function for listing KYC cases
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Fetch from database (Supabase)
    // const { data, error } = await supabase
    //   .from('kyc_cases')
    //   .select('*')
    //   .order('date', { ascending: false });

    // Mock data for now (will be replaced with database query)
    const mockCases = [
      {
        id: 'KYC-2025-001',
        name: 'Sarah Chen',
        status: 'approved',
        riskLevel: 'low',
        date: '2025-12-27',
        country: 'United States',
        checks: {
          identity: 'passed',
          sanctions: 'passed',
          pep: 'passed',
          adverseMedia: 'passed'
        }
      },
      {
        id: 'KYC-2025-002',
        name: 'Michael Rodriguez',
        status: 'review',
        riskLevel: 'medium',
        date: '2025-12-27',
        country: 'Mexico',
        checks: {
          identity: 'passed',
          sanctions: 'passed',
          pep: 'flagged',
          adverseMedia: 'passed'
        }
      },
      {
        id: 'KYC-2025-003',
        name: 'James Wilson',
        status: 'approved',
        riskLevel: 'low',
        date: '2025-12-26',
        country: 'United Kingdom',
        checks: {
          identity: 'passed',
          sanctions: 'passed',
          pep: 'passed',
          adverseMedia: 'passed'
        }
      }
    ];

    return res.status(200).json({
      success: true,
      cases: mockCases,
      total: mockCases.length
    });

  } catch (error) {
    console.error('Fetch Cases Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
