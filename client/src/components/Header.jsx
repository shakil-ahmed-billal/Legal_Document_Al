import { Scale } from 'lucide-react';


const Header = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <Scale className="text-blue-600" size={36} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Document Search</h1>
            <p className="text-gray-600 text-sm mt-1">AI-powered legal document query system</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header