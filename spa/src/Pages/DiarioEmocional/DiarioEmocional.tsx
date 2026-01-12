import React, { useState, useEffect, useRef } from 'react'; 
import styles from './DiarioEmocional.module.scss';
import { v4 as uuidv4 } from 'uuid';
import HeaderDiario from '../../_components/HeaderDiario/HeaderDiario'; // Ajuste o caminho conforme sua pasta

// Definição dos humores disponíveis
const moods = [
    { emoji: '😊', label: 'Excelente', value: 5 },
    { emoji: '🙂', label: 'Bom', value: 4 },
    { emoji: '😐', label: 'Neutro', value: 3 },
    { emoji: '😟', label: 'Ruim', value: 2 },
    { emoji: '😞', label: 'Péssimo', value: 1 },
];

const tags = ['Trabalho', 'Estudo', 'Família', 'Amigos', 'Saúde Física', 'Notícias', 'Finanças', 'Cuidado Pessoal'];

interface DiaryEntry {
    id: string;
    mood: string;
    moodValue: number; 
    text: string; 
    stressLevel: number;
    sleepHours: number;
    tags: string[]; 
    timestamp: number; 
}

const STORAGE_KEY = 'mindHealthDiaryEntriesV3';
const sleepOptions = [4, 5, 6, 7, 8, 9, 10];
const stressOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DIARIO_KEY = 'diarioTermosAceitos';


const DiarioImage = "/imgs/ceut5.png"; 
const PDF_PATH = "/docs/guia_manual.pdf"; 



const loadEntries = (): DiaryEntry[] => {
    try {
        const storedEntries = localStorage.getItem(STORAGE_KEY);
        if (storedEntries) {
            return JSON.parse(storedEntries).sort((a: DiaryEntry, b: DiaryEntry) => b.timestamp - a.timestamp);
        }
        return [];
    } catch (error) {
        console.error("Erro ao carregar do LocalStorage:", error);
        return [];
    }
};

const generateInsights = (entries: DiaryEntry[]) => {
    if (entries.length < 5) {
        return "Registre mais entradas para desbloquear a análise profunda de padrões!";
    }
    
    const moodCounts = entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    
    const avgStress = (entries.reduce((sum, entry) => sum + entry.stressLevel, 0) / entries.length).toFixed(1);

    if (mostFrequentMood === '😊' || mostFrequentMood === '🙂') {
        return `Seu humor mais frequente é ${mostFrequentMood}! Seu estresse médio é ${avgStress}/10. Mantenha os hábitos que estão funcionando.`;
    } else if (mostFrequentMood === '😞' || mostFrequentMood === '😟') {
        return `Alerta: Seu humor mais comum é ${mostFrequentMood}. Seu estresse médio é ${avgStress}/10. Tente focar em atividades de Cuidado Pessoal.`;
    } else {
        return `Sua tendência de humor está estável, mas o estresse médio é ${avgStress}/10. Tente aumentar as horas de sono para melhorar o bem-estar.`;
    }
};

const DiarioEmocional: React.FC = () => {
    const diaryRef = useRef<HTMLDivElement>(null); 
    
    const [termsAccepted, setTermsAccepted] = useState(
        localStorage.getItem(DIARIO_KEY) === 'true'
    );

    const [selectedMood, setSelectedMood] = useState(moods[0].emoji);
    const [entryText, setEntryText] = useState('');
    const [stressLevel, setStressLevel] = useState(5); 
    const [sleepHours, setSleepHours] = useState(8); 
    const [selectedTags, setSelectedTags] = useState<string[]>([]); 
    const [entries, setEntries] = useState<DiaryEntry[]>(loadEntries);
    const [saving, setSaving] = useState(false);

    const insights = generateInsights(entries);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        } catch (error) {
            console.error("Erro ao salvar no LocalStorage:", error);
        }
    }, [entries]);

    const handleAcceptTerms = () => {
        localStorage.setItem(DIARIO_KEY, 'true');
        setTermsAccepted(true);
        if (diaryRef.current) {
            diaryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = PDF_PATH;
        link.download = "guia_manual.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleToggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSaveEntry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!entryText.trim()) return;

        setSaving(true);
        const moodObj = moods.find(m => m.emoji === selectedMood) || moods[0];

        setTimeout(() => {
            const newEntry: DiaryEntry = {
                id: uuidv4(),
                mood: selectedMood,
                moodValue: moodObj.value, 
                text: entryText.trim(),
                stressLevel,
                sleepHours,
                tags: selectedTags, 
                timestamp: Date.now(),
            };

            setEntries(prevEntries => [newEntry, ...prevEntries]); 

            setEntryText('');
            setSelectedMood(moods[0].emoji);
            setStressLevel(5); 
            setSleepHours(8); 
            setSelectedTags([]);
            setSaving(false);
        }, 800);
    };

    const handleDeleteEntry = (entryId: string) => {
        if (!window.confirm("Tem certeza que deseja deletar esta anotação?")) return;
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
    };

    // --- COMPONENTE DO GRÁFICO SVG (alterar a responsividade do gráfico)---
    const MoodLineChart: React.FC<{ data: DiaryEntry[] }> = ({ data }) => {
        const lastSevenDays = data.slice(0, 7).reverse(); 
        const width = 800;
        const height = 200; 
        const margin = 50;

        if (lastSevenDays.length < 2) {
            return <p className={styles.chartMessage}>Precisa de pelo menos 2 anotações para exibir a tendência de humor.</p>;
        }

        const xMax = width - 2 * margin;
        const yMax = height - 2 * margin;
        
        const yScale = (value: number) => yMax - ((value - 1) / (5 - 1)) * yMax;

        const pathData = lastSevenDays.map((entry, index) => {
            const x = margin + index * (xMax / (lastSevenDays.length - 1));
            const y = margin + yScale(entry.moodValue);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        const circles = lastSevenDays.map((entry, index) => {
            const x = margin + index * (xMax / (lastSevenDays.length - 1));
            const y = margin + yScale(entry.moodValue);
            
            const dateText = new Date(entry.timestamp).toLocaleDateString('pt-BR').slice(0, 5);
            const isGoodMood = entry.moodValue >= 4;

            return (
                <g key={entry.id}>
                    <circle 
                        cx={x} 
                        cy={y} 
                        r="6" 
                        fill={isGoodMood ? '#A4CD3A' : '#54949F'} 
                        stroke="#fff" 
                        strokeWidth="2"
                    />
                    
                    <text x={x} y={height - 5} textAnchor="middle" fontSize="10" fill="#666">
                        {dateText}
                    </text>
                     <text x={x} y={y - 12} textAnchor="middle" fontSize="12">
                        {entry.mood}
                    </text>
                </g>
            );
        });
        
        const yAxisLabels = moods.map((mood) => {
            const y = margin + yScale(mood.value);
            return (
                <text key={mood.value} x={margin - 5} y={y + 4} textAnchor="end" fontSize="10" fill="#666">
                    {mood.label}
                </text>
            );
        }).reverse(); 

        return (
            <svg 
                viewBox={`0 0 ${width + margin} ${height + margin}`} 
                preserveAspectRatio="xMidYMid meet"
                className={styles.moodChart}
            >
                <line x1={margin} y1={height - margin} x2={width} y2={height - margin} stroke="#ccc" strokeDasharray="3 3" />
                <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#ccc" strokeDasharray="3 3" />

                <path d={pathData} fill="none" stroke="#54949F" strokeWidth="3" strokeLinecap="round" />
                
                {circles}
                
                {yAxisLabels}
            </svg>
        );
    };

    return(
     <>
       {/* --- HEADER FIXO INSERIDO AQUI --- */}
       <HeaderDiario />

       {/* SEÇÃO DE INTRODUÇÃO / TERMOS */}
       <section className={styles.introducao}
           style={{
               // URL corrigida para funcionar em qualquer rota
               backgroundImage: `url(${DiarioImage})`,
           }}
       >
           <div className={styles.introContent}>
               
               <h1 className={`${styles.tituloIntro} text-center font-anton`}>
                   BEM VINDO AO DIÁRIO! 📚
               </h1>
               
               <div className={styles.introFlexContainer}>

                   <div className={styles.introTextColumn}>
                       <h2 className={`${styles.subtituloIntro} fw-bold text-center font-anton`}>
                           Antes de começar será disponibilizada uma breve explicação abaixo
                       </h2>
                       <p className={`${styles.descricaoIntro} lead mt-3 font-anton fw-bold`}>
                           O diário emocional é uma ferramenta que consiste em uma sequência de perguntas que devem ser respondidas diariamente. O objetivo é gerar um gráfico que realiza a comparação entre as marcações feitas anteriormente, possibilitando que o usuário tenha noção de sua evolução emocional ao decorrer da semana.
                       </p>
                   </div>

                   {/* CARD DE DOWNLOAD */}
                   <div className={styles.downloadCard}>
                       <h3 className={styles.downloadTitle}>
                           Guia Completo
                       </h3>
                       <p className={styles.downloadSubtitle}>
                           Baixe o PDF com o guia detalhado do Diário Emocional e informações sobre Saúde Mental.
                       </p>
                       <button onClick={handleDownload} className={styles.downloadButton}>
                           DOWNLOAD
                       </button>
                   </div>

               </div>
               
               {/* TERMOS DE ACEITE */}
               <div className={styles.termsContainer}>
                   
                   <p className={styles.termsText}>
                       <span className={styles.alertIcon}>⚠️</span> 
                       **AVISO IMPORTANTE:** Este Diário Emocional é uma ferramenta de **autoconhecimento** e não substitui a consulta ou acompanhamento com profissionais de **Saúde Mental** (psicólogos, psiquiatras). Além disso, garantimos a **confidencialidade dos seus dados**.
                   </p>
                   
                   {termsAccepted ? (
                       <button 
                           className={`${styles.btnExplore} ${styles.acceptedBtn}`}
                           onClick={handleAcceptTerms}
                       >
                           Diário Liberado! Comece a Registrar ↓
                       </button>
                   ) : (
                       <button 
                           className={styles.btnExplore}
                           onClick={handleAcceptTerms}
                       >
                           Eu Li e Aceito os Termos
                           <span className={styles.arrow}>↓</span>
                       </button>
                   )}
               </div>

           </div>
       </section>
       
       {/* CONTEÚDO PRINCIPAL DO DIÁRIO (Só visível após o aceite) */}
       <div ref={diaryRef} className={styles.diarioContainer} style={{ display: termsAccepted ? 'block' : 'none', backgroundColor: 'white' }}>
           
           <header className={styles.header}>
               <h1 className={styles.title}>Diario Emocional 📊</h1>
               <p className={styles.subtitle}>Sua análise de dados e padrões de humor.</p>
           </header>

           {/* SEÇÃO DE INSIGHTS */}
           <div className={styles.insightsCard}>
               <h3 className={styles.insightsTitle}>Análise Rápida de Padrões</h3>
               <p className={styles.insightsText}>{insights}</p>
           </div>
           
           {/* SEÇÃO DE VISUALIZAÇÃO GRÁFICA */}
           <div className={styles.graphSection}>
               <h2 className={styles.sectionTitle}>Tendência de Humor (Últimas 7 Anotações) </h2>
               <div className={styles.chartWrapper}>
                    <MoodLineChart data={entries} />
               </div>
           </div>


           {/* SEÇÃO DE NOVA ENTRADA */}
           <div className={styles.newEntrySection}> 
               <h2 className={styles.sectionTitle}>Nova Anotação de Bem-Estar</h2>
               
               <form onSubmit={handleSaveEntry} className={styles.moodForm}>
                   {/* 1. SELEÇÃO DE HUMOR */}
                   <label className={styles.inputLabel}>1. Qual seu humor predominante hoje?</label>
                   <div className={styles.moodSelector}>
                       {moods.map(mood => (
                           <button
                               key={mood.emoji}
                               type="button"
                               onClick={() => setSelectedMood(mood.emoji)}
                               className={`${styles.moodOption} ${selectedMood === mood.emoji ? styles.selected : ''}`}
                               aria-label={`Sentindo-se ${mood.label}`}
                           >
                               <span className={styles.moodEmoji}>{mood.emoji}</span>
                               <span className={styles.moodLabel}>{mood.label}</span>
                           </button>
                       ))}
                   </div>

                   {/* 2. NÍVEL DE ESTRESSE */}
                   <label className={styles.inputLabel}>2. Nível de Estresse Percebido (1=Baixo a 10=Alto)</label>
                   <div className={styles.sliderContainer}>
                       <span>{stressLevel}/10</span>
                       <input
                           type="range"
                           min="1"
                           max="10"
                           value={stressLevel}
                           onChange={(e) => setStressLevel(Number(e.target.value))}
                           className={styles.rangeSlider}
                           disabled={saving}
                       />
                   </div>
                   
                   {/* 3. HORAS DE SONO */}
                    <label className={styles.inputLabel}>3. Quantas horas você dormiu na noite passada?</label>
                   <div className={styles.sleepSelector}>
                       <select
                           value={sleepHours}
                           onChange={(e) => setSleepHours(Number(e.target.value))}
                           className={styles.selectInput}
                           disabled={saving}
                       >
                           {sleepOptions.map(h => <option key={h} value={h}>{h} horas</option>)}
                       </select>
                   </div>
                   
                   {/* 4. GATILHOS/TAGS */}
                   <label className={styles.inputLabel}>4. Quais fatores mais influenciaram seu humor hoje?</label>
                   <div className={styles.tagSelector}>
                       {tags.map(tag => (
                           <button
                               key={tag}
                               type="button"
                               onClick={() => handleToggleTag(tag)}
                               className={`${styles.tagOption} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
                           >
                               #{tag}
                           </button>
                       ))}
                   </div>


                   {/* 5. TEXTO DO DIÁRIO */}
                   <label className={styles.inputLabel}>5. Anotação Diária (Detalhes dos Eventos):</label>
                   <textarea
                       className={styles.entryTextarea}
                       placeholder="Quais foram os eventos ou pensamentos que impactaram seu humor? O que você fez para cuidar de si?"
                       value={entryText}
                       onChange={(e) => setEntryText(e.target.value)}
                       rows={6}
                       required
                       disabled={saving}
                   />

                   <button type="submit" className={styles.saveButton} disabled={saving || !entryText.trim()}>
                       {saving ? 'SALVANDO...' : 'SALVAR ANOTAÇÃO'}
                   </button>
               </form>
           </div>

           {/* SEÇÃO DE ENTRADAS ANTERIORES */}
           <div className={styles.historySection}>
               <h2 className={styles.sectionTitle}>Histórico de Entradas ({entries.length})</h2>
               
               <div className={styles.entriesList}>
                   {entries.length === 0 ? (
                       <p className={styles.noEntries}>Nenhuma anotação encontrada. Comece a registrar!</p>
                   ) : (
                       entries.map(entry => (
                           <div key={entry.id} className={styles.entryCard}>
                               <div className={styles.entryHeader}>
                                   <span className={styles.cardMoodEmoji}>{entry.mood}</span>
                                   <span className={styles.cardTimestamp}>
                                       {new Date(entry.timestamp).toLocaleDateString('pt-BR')}
                                   </span>
                               </div>
                               <p className={styles.cardMetrics}>
                                   Estresse: {entry.stressLevel}/10 &nbsp;|&nbsp; 
                                   Sono: {entry.sleepHours}h
                               </p>
                               <div className={styles.cardTags}>
                                    {entry.tags?.map?.(tag => (
                                    <span key={tag} className={styles.tagDisplay}>#{tag}</span>))}
                               </div>
                               <p className={styles.cardText}>{entry.text}</p>
                               <button 
                                   className={styles.deleteButton} 
                                   onClick={() => handleDeleteEntry(entry.id)}
                                   title="Excluir Anotação"
                               >
                                   &times;
                               </button>
                           </div>
                       ))
                   )}
               </div>
           </div>
       </div>
     </>
    );
};

export default DiarioEmocional;