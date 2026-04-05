import streamlit as st
import requests

st.set_page_config(page_title="FutureMe AI", page_icon="🔮")

st.title("🔮 FutureMe AI")
st.subheader("Simulador de Realidade Alternativa")

with st.sidebar:
    st.info("Suas decisões de hoje moldam o seu amanhã.")
    if st.button("Limpar Histórico"):
        st.cache_data.clear()

user_input = st.text_area("O que você decidiu fazer (ou deixar de fazer) hoje?")

if st.button("Simular Futuro"):
    if user_input:
        with st.spinner("Calculando linhas do tempo..."):
            
            response = requests.post(
                "http://127.0.0.1:8000/simulate", 
                json={"user_decision": user_input}
            )
            
            if response.status_code == 200:
                data = response.json()
                
                col1, col2 = st.columns(2)
                
                with col1:
                    st.error("📉 Cenário de Inércia")
                    st.write(data['negative_scenario'])
                
                with col2:
                    st.success("📈 Cenário de Potencial")
                    st.write(data['positive_scenario'])
            else:
                st.error("Erro ao conectar com o servidor.")
    else:
        st.warning("Por favor, digite algo antes de simular.")