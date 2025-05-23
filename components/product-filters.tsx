'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Slider } from './ui/slider'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`?${params.toString()}`)
  }

  const handlePriceChange = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('minPrice', value[0].toString())
    params.set('maxPrice', value[1].toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Condição</h3>
          <RadioGroup
            defaultValue={searchParams.get('condition') || 'all'}
            onValueChange={(value) => handleFilterChange('condition', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Todas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NEW" id="new" />
              <Label htmlFor="new">Novo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USED" id="used" />
              <Label htmlFor="used">Usado</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Preço</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[
                Number(searchParams.get('minPrice')) || 0,
                Number(searchParams.get('maxPrice')) || 10000,
              ]}
              max={10000}
              step={100}
              onValueChange={handlePriceChange}
            />
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="minPrice">Mínimo</Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={searchParams.get('minPrice') || '0'}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="maxPrice">Máximo</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={searchParams.get('maxPrice') || '10000'}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/')}
        >
          Limpar Filtros
        </Button>
      </div>
    </Card>
  )
} 