import { Phone, MapPin, Mail, Clock, Cross } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cross className="w-6 h-6" />
              <h3 className="text-xl font-serif">Iglesia Pentecostal Casa de Dios</h3>
            </div>
            <p className="text-slate-300 mb-4">
              A welcoming community where faith, love, and hope come together. 
              Join us in worship and fellowship as we grow in Christ.
            </p>
            <p className="text-slate-400 text-sm">
              &quot;For where two or three gather in my name, there am I with them.&quot; - Matthew 18:20
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <p>13315 Veterans Memorial Dr #409</p>
                  <p>Houston, TX 77014</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400" />
                <p>(281) 713-0681</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <p>info@church.org</p>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-medium mb-4">Service Times</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium">Sunday School</p>
                  <p className="text-slate-300">10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium">Sunday Service</p>
                  <p className="text-slate-300">12:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium">Tuesday Prayer</p>
                  <p className="text-slate-300">8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-medium">Friday Service</p>
                  <p className="text-slate-300">8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Iglesia Pentecostal Casa de Dios. All rights reserved. | Built with love and faith.
          </p>
        </div>
      </div>
    </footer>
  );
}