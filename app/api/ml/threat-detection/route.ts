import { type NextRequest, NextResponse } from "next/server"

interface ThreatDetectionRequest {
  chargerId: string
  networkData: {
    packetSizes: number[]
    connectionFrequency: number
    protocolDistribution: Record<string, number>
  }
  ocppMessages: {
    messageTypes: string[]
    timingPatterns: number[]
    payloadSizes: number[]
  }
  userBehavior: {
    sessionDuration: number
    chargingPattern: string
    deviceFingerprint: string
  }
  unusualActivityScore?: number
  loginAttempts?: number
  failedLoginAttempts?: number
  firmwareChecksumMismatch?: boolean
  networkTrafficSpike?: number
}

interface ThreatPrediction {
  threatProbability: number
  confidence: number
  threatType: string
  severity: "low" | "medium" | "high" | "critical"
  recommendedAction: string
  features: Record<string, number>
  modelVersion: string
}

// Mock ML model inference
class ThreatDetectionModel {
  private modelVersion = "v1.2.3"

  async predict(data: ThreatDetectionRequest): Promise<ThreatPrediction> {
    // Extract features
    const features = this.extractFeatures(data)

    // Simulate ML model inference
    const threatProbability = this.calculateThreatProbability(features)
    const confidence = Math.min(0.95, threatProbability + 0.1)

    // Determine threat type and severity
    const threatType = this.classifyThreatType(features)
    const severity = this.determineSeverity(threatProbability)

    return {
      threatProbability,
      confidence,
      threatType,
      severity,
      recommendedAction: this.getRecommendedAction(severity, threatType),
      features,
      modelVersion: this.modelVersion,
    }
  }

  private extractFeatures(data: ThreatDetectionRequest): Record<string, number> {
    const { networkData, ocppMessages, userBehavior } = data

    return {
      packetSizeMean: networkData.packetSizes.reduce((a, b) => a + b, 0) / networkData.packetSizes.length,
      packetSizeStd: this.calculateStandardDeviation(networkData.packetSizes),
      connectionFrequency: networkData.connectionFrequency,
      protocolDiversity: Object.keys(networkData.protocolDistribution).length,
      messageTypeEntropy: this.calculateEntropy(ocppMessages.messageTypes),
      timingAnomalyScore: this.detectTimingAnomalies(ocppMessages.timingPatterns),
      payloadSizeAnomaly: this.detectSizeAnomalies(ocppMessages.payloadSizes),
      sessionDurationAnomaly: this.calculateDurationAnomaly(userBehavior.sessionDuration),
      behaviorDeviationScore: this.calculateBehaviorDeviation(userBehavior.chargingPattern),
      deviceFingerprintRisk: this.assessDeviceRisk(userBehavior.deviceFingerprint),
      unusualActivityScore: data.unusualActivityScore || 0,
      loginAttempts: data.loginAttempts || 0,
      failedLoginAttempts: data.failedLoginAttempts || 0,
      firmwareChecksumMismatch: data.firmwareChecksumMismatch ? 1 : 0,
      networkTrafficSpike: data.networkTrafficSpike || 0,
    }
  }

  private calculateThreatProbability(features: Record<string, number>): number {
    // Weighted feature combination (simplified ML model simulation)
    const weights = {
      packetSizeMean: 0.1,
      packetSizeStd: 0.15,
      connectionFrequency: 0.12,
      protocolDiversity: 0.08,
      messageTypeEntropy: 0.2,
      timingAnomalyScore: 0.25,
      payloadSizeAnomaly: 0.18,
      sessionDurationAnomaly: 0.1,
      behaviorDeviationScore: 0.15,
      deviceFingerprintRisk: 0.22,
      unusualActivityScore: 0.2,
      loginAttempts: 0.1,
      failedLoginAttempts: 0.15,
      firmwareChecksumMismatch: 0.3,
      networkTrafficSpike: 0.1,
    }

    let score = 0
    for (const [feature, value] of Object.entries(features)) {
      score += (weights[feature as keyof typeof weights] || 0) * Math.min(1, value)
    }

    return Math.min(0.99, Math.max(0.01, score))
  }

  private classifyThreatType(features: Record<string, number>): string {
    if (features.timingAnomalyScore > 0.7) return "Man-in-the-Middle Attack"
    if (features.payloadSizeAnomaly > 0.8) return "Malware Injection"
    if (features.protocolDiversity > 0.6) return "Protocol Anomaly"
    if (features.deviceFingerprintRisk > 0.7) return "Unauthorized Access"
    if (features.behaviorDeviationScore > 0.6) return "Session Hijacking"
    if (features.unusualActivityScore > 0.7) return "Unusual Activity"
    if (features.loginAttempts > 5 && features.failedLoginAttempts > 3) return "Brute Force Attempt"
    if (features.firmwareChecksumMismatch > 0.2) return "Firmware Tampering"
    if (features.networkTrafficSpike > 0.1) return "DDoS Suspect"
    return "Unknown Threat Pattern"
  }

  private determineSeverity(probability: number): "low" | "medium" | "high" | "critical" {
    if (probability >= 0.8) return "critical"
    if (probability >= 0.6) return "high"
    if (probability >= 0.4) return "medium"
    return "low"
  }

  private getRecommendedAction(severity: string, threatType: string): string {
    const actions = {
      critical: "Immediately isolate charger and notify security team",
      high: "Increase monitoring and prepare for isolation",
      medium: "Enhanced logging and user notification",
      low: "Continue monitoring with standard protocols",
    }
    return actions[severity as keyof typeof actions] || "Monitor situation"
  }

  private calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }

  private calculateEntropy(items: string[]): number {
    const counts = items.reduce(
      (acc, item) => {
        acc[item] = (acc[item] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const total = items.length
    return Object.values(counts).reduce((entropy, count) => {
      const p = count / total
      return entropy - p * Math.log2(p)
    }, 0)
  }

  private detectTimingAnomalies(timings: number[]): number {
    if (timings.length < 2) return 0

    const intervals = timings.slice(1).map((time, i) => time - timings[i])
    const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const anomalies = intervals.filter((interval) => Math.abs(interval - meanInterval) > meanInterval * 0.5)

    return anomalies.length / intervals.length
  }

  private detectSizeAnomalies(sizes: number[]): number {
    if (sizes.length === 0) return 0

    const mean = sizes.reduce((a, b) => a + b, 0) / sizes.length
    const std = this.calculateStandardDeviation(sizes)
    const anomalies = sizes.filter((size) => Math.abs(size - mean) > 2 * std)

    return anomalies.length / sizes.length
  }

  private calculateDurationAnomaly(duration: number): number {
    // Typical charging session: 30-120 minutes
    const typicalMin = 30 * 60 * 1000 // 30 minutes in ms
    const typicalMax = 120 * 60 * 1000 // 120 minutes in ms

    if (duration < typicalMin) return (typicalMin - duration) / typicalMin
    if (duration > typicalMax) return Math.min(1, (duration - typicalMax) / typicalMax)
    return 0
  }

  private calculateBehaviorDeviation(pattern: string): number {
    // Simulate behavior analysis
    const suspiciousPatterns = ["rapid_disconnect", "unusual_timing", "multiple_attempts"]
    return suspiciousPatterns.includes(pattern) ? 0.8 : Math.random() * 0.3
  }

  private assessDeviceRisk(fingerprint: string): number {
    // Simulate device fingerprint risk assessment
    const knownBadFingerprints = ["suspicious_device_1", "malware_infected"]
    if (knownBadFingerprints.includes(fingerprint)) return 0.9

    // Check for anomalous characteristics
    if (fingerprint.includes("modified") || fingerprint.includes("rooted")) return 0.7

    return Math.random() * 0.2
  }
}

const model = new ThreatDetectionModel()

export async function POST(request: NextRequest) {
  try {
    const data: ThreatDetectionRequest = await request.json()

    if (!data) {
      return NextResponse.json({ error: "No data provided for threat detection." }, { status: 400 })
    }

    console.log("Received data for ML threat detection:", data)

    // Simulate ML model processing
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate processing time

    const prediction = await model.predict(data)

    return NextResponse.json({
      threatDetected: prediction.threatProbability > 0.5,
      threat:
        prediction.threatProbability > 0.5
          ? {
              type: prediction.threatType,
              severity: prediction.severity,
              description: `Potential ${prediction.threatType} detected.`,
              timestamp: new Date().toISOString(),
            }
          : null,
      analysis: {
        processedData: data,
        modelConfidence: prediction.confidence,
      },
    })
  } catch (error) {
    console.error("ML Threat Detection API error:", error)
    return NextResponse.json({ error: "Failed to perform ML threat detection." }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ message: "ML Threat Detection API is running. Send POST requests with data." })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get model information" }, { status: 500 })
  }
}
