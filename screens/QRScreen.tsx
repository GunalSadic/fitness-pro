import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { X } from 'lucide-react-native';

export default function QRScreen({ navigation }: any) {
  const active = true;
  const payload = JSON.stringify({ uid: "user@test.com", ts: Date.now() });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>GYM ENTRY</Text>
          <Text style={styles.headerTitle}>Your QR Code</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('Home')}>
          <X color="#000" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <QRCode 
            value={payload} 
            size={220} 
            color="#0a0a0a" 
            backgroundColor="#ffffff" 
          />
        </View>

        <Text style={styles.instruction}>Scan this code at the gym entrance</Text>
        <Text style={styles.instructionSub}>Valid only with active membership</Text>
      </View>

      <View style={[styles.statusBanner, active ? styles.statusActive : styles.statusExpired]}>
        <View style={[styles.statusDot, active ? {backgroundColor: '#16a34a'} : {backgroundColor: '#dc2626'}]} />
        <Text style={[styles.statusText, active ? {color: '#16a34a'} : {color: '#dc2626'}]}>
          {active ? "Membership active" : "Membership expired"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa', justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24 },
  headerSubtitle: { fontSize: 10, color: '#888', fontWeight: 'bold', letterSpacing: 1 }, // <-- Fixed here
  headerTitle: { fontSize: 20, fontWeight: '600' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  qrContainer: { padding: 24, backgroundColor: '#fff', borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, elevation: 10, marginBottom: 30 },
  instruction: { fontSize: 16, fontWeight: '500' },
  instructionSub: { fontSize: 14, color: '#888', marginTop: 4 },
  statusBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, margin: 24, borderRadius: 16, borderWidth: 1, gap: 8 },
  statusActive: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
  statusExpired: { backgroundColor: '#fef2f2', borderColor: '#fecaca' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '600' }
});