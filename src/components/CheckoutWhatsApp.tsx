import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Loader, Check } from 'lucide-react'
import { CartItem } from '../types'

interface CheckoutWhatsAppProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onCheckoutComplete?: (orderId: string) => void
}

export default function CheckoutWhatsApp({
  isOpen,
  onClose,
  cartItems,
  onCheckoutComplete
}: CheckoutWhatsAppProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  const handleCheckout = async () => {
    if (!email || !phone) {
      setError('Por favor completa email y teléfono')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/orders/create-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customerEmail: email,
          customerPhone: phone,
          subtotal,
          total
        })
      })

      if (!response.ok) {
        throw new Error('Error creating order')
      }

      const data = await response.json()
      const orderId = data.orderId

      const intro = "🌿 *¡Hola, Three Purple Greens!* 🌿\n\nHe armado mi carrito de compras y me gustaría proceder con el pedido de los siguientes productos:\n\n"
      const itemsText = cartItems.map(item => {
        const categoryEmoji = item.product.category === 'cepa' ? '🌸' : item.product.category === 'topico' ? '🧴' : '🍯'
        return `${categoryEmoji} *${item.product.name}*\n   • Cantidad: ${item.quantity}\n   • Precio: $${item.product.price.toFixed(2)} MXN c/u\n   • Total: $${(item.product.price * item.quantity).toFixed(2)} MXN\n\n`
      }).join('')
      
      const pricingText = `📊 *Resumen Financiero:*\n- Subtotal: $${subtotal.toFixed(2)} MXN\n- IVA Estimado (16%): $${tax.toFixed(2)} MXN\n💎 *Total Final:* *$${total.toFixed(2)} MXN*`
      const footer = "\n\nQuedo a la espera de sus comentarios para acordar la dirección de envío, logística y los métodos de pago disponibles. ¡Muchas gracias! ✨"
      
      const fullText = encodeURIComponent(intro + itemsText + pricingText + footer)
      const phoneNumber = process.env.VITE_WHATSAPP_PHONE || '573001234567'
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${fullText}`

      if (onCheckoutComplete) {
        onCheckoutComplete(orderId)
      }

      window.open(whatsappUrl, '_blank')
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error en el checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-neutral-900 border border-brand-green/30 rounded-lg p-6 shadow-[0_0_40px_rgba(149,218,18,0.3)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-neutral-800 text-brand-text-dim hover:text-white rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold uppercase text-brand-text mb-6 text-lg tracking-wider">
              Confirmar Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-brand-text-dim mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded text-brand-text placeholder-brand-text-dim/50 focus:outline-none focus:border-brand-green/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-brand-text-dim mb-2">
                  Teléfono WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+52 1234567890"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded text-brand-text placeholder-brand-text-dim/50 focus:outline-none focus:border-brand-green/50 transition-colors disabled:opacity-50"
                />
              </div>

              <div className="bg-neutral-950/60 border border-neutral-800 rounded p-3 font-mono text-xs">
                <div className="flex justify-between text-brand-text-dim mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-text-dim mb-2">
                  <span>IVA (16%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-700 pt-2 flex justify-between text-brand-text font-bold">
                  <span>Total:</span>
                  <span className="text-brand-green">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded p-3 mb-4">
                <p className="text-red-400 text-xs font-mono">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 border border-neutral-700 rounded text-brand-text hover:bg-neutral-800 transition-colors disabled:opacity-50 font-mono text-xs uppercase tracking-widest"
              >
                Cancelar
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-1 py-2.5 bg-brand-green hover:bg-brand-green-hover text-brand-bg rounded font-display font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Ir a WhatsApp
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

