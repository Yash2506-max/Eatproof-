const API_BASE_URL = 'http://localhost:5000'

export interface ScanRequest {
  barcode: string
  batch_number?: string
  expiry_date?: string
  ingredients: string[]
  product_name?: string
  raw_data?: any
}

export interface ScanResponse {
  id: string
  barcode: string
  product_score: number
  ingredient_score: number
  health_risk_score: number
  safety_score: number
  raw_data?: any
  created_at: string
  analysis?: {
    packaging: any
    ingredients: any
    safety_breakdown: any
  }
}

export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export const api = {
  // Auth endpoints
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to get user')
    return response.json()
  },

  // Scan endpoints
  async analyzeProduct(scanRequest: ScanRequest): Promise<ScanResponse> {
    const response = await fetch(`${API_BASE_URL}/scan/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scanRequest),
    })
    if (!response.ok) throw new Error('Failed to analyze product')
    return response.json()
  },

  async getScanHistory(limit: number = 10): Promise<ScanResponse[]> {
    const response = await fetch(`${API_BASE_URL}/scan/history?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to get scan history')
    return response.json()
  },

  // Health profile endpoints
  async getHealthProfile() {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Failed to get health profile')
    return response.json()
  },

  async updateHealthProfile(profile: any) {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    })
    if (!response.ok) throw new Error('Failed to update health profile')
    return response.json()
  },
}
