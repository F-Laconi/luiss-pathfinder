import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Apple, Wallet } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  const note = location.state?.note || {
    studentName: "Unknown",
    price: "€0",
    pageCount: 0,
    description: "No item selected"
  };

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard, color: "bg-blue-500", description: "Pay securely with Visa, Mastercard or Amex" },
    { id: "apple", name: "Apple Pay", icon: Apple, color: "bg-black", description: "Fast and safe with Face ID" },
    { id: "klarna", name: "Klarna", icon: Wallet, color: "bg-pink-500", description: "Divide your payments without stress" },
    { id: "satispay", name: "Satispay", icon: Wallet, color: "bg-red-500", description: "Quick checkout with your phone" },
  ];

  const handleCheckout = () => {
    if (!selectedPayment) return;
    // Here you would integrate with actual payment processing
    alert(`Processing payment with ${selectedPayment}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <Link to={-1 as any} onClick={(e) => { e.preventDefault(); navigate(-1); }} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <h1 className="font-helvetica text-3xl font-bold text-foreground uppercase mb-8">CHECKOUT</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium">Student Notes by {note.studentName}</p>
                <p className="text-sm text-muted-foreground">{note.pageCount} pages</p>
              </div>
              <span className="font-bold text-lg">{note.price}</span>
            </div>
            <div className="flex justify-between items-center py-3 mt-2">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">{note.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === method.id 
                    ? "border-primary bg-primary/10 shadow-md" 
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${method.color} text-white`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{method.name}</span>
                </div>
                <span className="text-xs text-muted-foreground text-left">{method.description}</span>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <div className="text-center space-y-3">
          <Button 
            onClick={handleCheckout}
            disabled={!selectedPayment}
            className="w-full py-7 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all rounded-xl"
            size="lg"
          >
            Complete Purchase
          </Button>
          <p className="text-base font-medium text-foreground/80">Just a click and notes are yours ✨</p>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Secure payment powered by our trusted partners
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
