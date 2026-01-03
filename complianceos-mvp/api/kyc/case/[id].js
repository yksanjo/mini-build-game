// Vercel Serverless Function for getting a specific KYC case
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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Case ID is required' });
    }

    // TODO: Fetch from database (Supabase)
    // const { data, error } = await supabase
    //   .from('kyc_cases')
    //   .select('*')
    //   .eq('id', id)
    //   .single();

    // Mock data for now
    const mockCases = {
      'KYC-2025-001': {
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
      'KYC-2025-002': {
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
      'KYC-2025-003': {
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
    };

    const caseData = mockCases[id];

    if (!caseData) {
      return res.status(404).json({
        error: 'Case not found',
        id
      });
    }

    return res.status(200).json({
      success: true,
      case: caseData
    });

  } catch (error) {
    console.error('Fetch Case Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
