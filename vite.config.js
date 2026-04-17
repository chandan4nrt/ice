import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],



  // server: {
  //   host: true,
  //   port: 4000, // Change this to your desired port
  //   // https: {
  //   //   key: fs.readFileSync('./localhost+1-key.pem'),
  //   //   cert: fs.readFileSync('./localhost+1.pem'),
  //   // }
  //    allowedHosts: 'all'
  // }


server: {
  host: '0.0.0.0',
  port: 4000,
  strictPort: true,
  allowedHosts: true
}
  
})

